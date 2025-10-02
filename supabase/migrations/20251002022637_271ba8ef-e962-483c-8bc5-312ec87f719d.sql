-- Add RLS policies to allow all operations on products table (for development)

-- Policy for INSERT
CREATE POLICY "Anyone can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

-- Policy for UPDATE
CREATE POLICY "Anyone can update products" 
ON public.products 
FOR UPDATE 
USING (true);

-- Policy for DELETE
CREATE POLICY "Anyone can delete products" 
ON public.products 
FOR DELETE 
USING (true);