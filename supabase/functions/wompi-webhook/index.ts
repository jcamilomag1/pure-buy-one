import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { corsHeaders } from '../_shared/cors.ts';

const WOMPI_EVENTS_SECRET = Deno.env.get('WOMPI_EVENTS_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

async function verifyEventSignature(
  body: any,
  requestTimestamp: string,
  signatureReceived: string
): Promise<boolean> {
  const secret = WOMPI_EVENTS_SECRET;
  if (!secret) {
    console.error('WOMPI_EVENTS_SECRET not configured');
    return false;
  }

  // Construir la cadena de concatenación exacta
  const concatenatedString = JSON.stringify(body) + requestTimestamp + secret;
  
  // Calcular SHA-256
  const msgBuffer = new TextEncoder().encode(concatenatedString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const calculatedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  console.log('Calculated hash:', calculatedHash);
  console.log('Received signature:', signatureReceived);
  
  return calculatedHash === signatureReceived;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  try {
    console.log('Webhook received from Wompi');

    // Validar que sea POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verificar firma (SEGURIDAD CRÍTICA)
    const isValid = await verifyEventSignature(body, timestamp, signature);
    
    if (!isValid) {
      console.error('Invalid signature - Unauthorized');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Signature verified successfully');

    // Process only transaction.updated events
    const { event, data } = body;
    
    if (event !== 'transaction.updated') {
      console.log(`Ignoring event type: ${event}`);
      return new Response(
        JSON.stringify({ message: 'Event received' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract transaction data
    const { id: wompiId, reference, status, amount_in_cents } = data.transaction;
    console.log(`Processing transaction: ${reference}, status: ${status}, wompiId: ${wompiId}, amount: ${amount_in_cents}`);

    // Create Supabase client with service role
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Update transaction con verificaciones de seguridad
    const { data: updateResult, error: updateError } = await supabase
      .from('transactions')
      .update({ 
        status: status,
        wompi_id: wompiId,
        updated_at: new Date().toISOString()
      })
      .eq('reference', reference)
      .eq('amount_in_cents', amount_in_cents) // Verificación de seguridad: el monto debe coincidir
      .eq('status', 'PENDING') // Solo actualizar transacciones pendientes
      .select();

    if (updateError) {
      console.error('Error updating transaction:', updateError);
      return new Response(
        JSON.stringify({ error: 'Database update failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!updateResult || updateResult.length === 0) {
      console.log('No matching PENDING transaction found with reference:', reference, 'and amount:', amount_in_cents);
      // Still return 200 to prevent Wompi from retrying
      return new Response(
        JSON.stringify({ message: 'Event received' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Transaction updated successfully:', updateResult);

    return new Response(
      JSON.stringify({ message: 'Event received' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
