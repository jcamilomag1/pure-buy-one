import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const WOMPI_EVENTS_SECRET = Deno.env.get('WOMPI_EVENTS_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function verifySignature(
  body: any,
  signature: string,
  timestamp: string,
  secret: string
): Promise<boolean> {
  const concatenatedString = JSON.stringify(body) + timestamp + secret;
  const calculatedHash = await sha256(concatenatedString);
  console.log('Calculated hash:', calculatedHash);
  console.log('Received signature:', signature);
  return calculatedHash === signature;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-wompi-signature-events, x-wompi-request-timestamp',
      },
    });
  }

  try {
    console.log('Webhook received from Wompi');

    // Validate environment variables
    if (!WOMPI_EVENTS_SECRET) {
      console.error('Missing WOMPI_EVENTS_SECRET environment variable');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body = await req.json();
    console.log('Webhook body:', JSON.stringify(body, null, 2));

    // Get signature headers
    const signature = req.headers.get('x-wompi-signature-events');
    const timestamp = req.headers.get('x-wompi-request-timestamp');

    if (!signature || !timestamp) {
      console.error('Missing signature headers');
      return new Response(
        JSON.stringify({ error: 'Missing signature headers' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify signature
    const isValid = await verifySignature(body, signature, timestamp, WOMPI_EVENTS_SECRET);
    
    if (!isValid) {
      console.error('Invalid signature');
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Signature verified successfully');

    // Process only transaction.updated events
    const { event, data } = body;
    
    if (event !== 'transaction.updated') {
      console.log(`Ignoring event type: ${event}`);
      return new Response(
        JSON.stringify({ message: 'Event ignored' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract transaction data
    const { id: wompiId, reference, status } = data.transaction;
    console.log(`Processing transaction: ${reference}, status: ${status}, wompiId: ${wompiId}`);

    // Create Supabase client with service role
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Update transaction only if current status is PENDING
    const { data: updateResult, error: updateError } = await supabase
      .from('transactions')
      .update({ 
        status: status,
        wompi_id: wompiId,
        updated_at: new Date().toISOString()
      })
      .eq('reference', reference)
      .eq('status', 'PENDING')
      .select();

    if (updateError) {
      console.error('Error updating transaction:', updateError);
      return new Response(
        JSON.stringify({ error: 'Database update failed' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!updateResult || updateResult.length === 0) {
      console.log('No PENDING transaction found with reference:', reference);
      // Still return 200 to prevent Wompi from retrying
      return new Response(
        JSON.stringify({ message: 'No pending transaction to update' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Transaction updated successfully:', updateResult);

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook processed successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
