import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';
import { corsHeaders } from '../_shared/cors.ts';

// Helper function to calculate SHA-256 hash
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }), 
        { 
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const wompiIntegritySecret = Deno.env.get('WOMPI_INTEGRITY_SECRET');
    const wompiPublicKey = Deno.env.get('WOMPI_PUBLIC_KEY');

    if (!supabaseUrl || !supabaseServiceKey || !wompiIntegritySecret || !wompiPublicKey) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse request body
    const { productReference } = await req.json();

    if (!productReference) {
      return new Response(
        JSON.stringify({ error: 'productReference is required' }), 
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create Supabase client with service role key for secure database access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Query product from database - NEVER trust price from frontend
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, price')
      .eq('reference', productReference)
      .single();

    if (productError || !product) {
      console.error('Product not found:', productError);
      return new Response(
        JSON.stringify({ error: 'Product not found' }), 
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate unique transaction reference
    const transactionRef = `${productReference}-${crypto.randomUUID()}`;

    // Calculate amount in cents
    const amountInCents = Math.round(product.price * 100);

    // Currency
    const currency = 'COP';

    // Calculate Wompi integrity signature
    const concatenatedString = `${transactionRef}${amountInCents}${currency}${wompiIntegritySecret}`;
    const signature = await sha256(concatenatedString);

    console.log('Generated signature for transaction:', transactionRef);

    // Insert transaction into database before responding
    const { error: insertError } = await supabase
      .from('transactions')
      .insert({
        reference: transactionRef,
        amount_in_cents: amountInCents,
        currency: currency,
        status: 'PENDING',
        product_id: product.id,
        signature: signature
      });

    if (insertError) {
      console.error('Failed to insert transaction:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create transaction' }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Return response with payment data
    return new Response(
      JSON.stringify({
        reference: transactionRef,
        amountInCents: amountInCents,
        signature: signature,
        publicKey: wompiPublicKey
      }), 
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
