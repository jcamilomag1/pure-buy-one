-- Create products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    reference VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view products
CREATE POLICY "Anyone can view products"
ON products
FOR SELECT
USING (true);

-- Insert products
INSERT INTO products (name, description, price, reference)
VALUES 
  ('Auriculares Premium', 'Auriculares inalámbricos premium con cancelación de ruido.', 399, 'AUR-001'),
  ('Smartwatch Premium', 'Smartwatch con pantalla AMOLED y seguimiento completo de salud.', 499, 'SMW-001');

-- Create transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wompi_id VARCHAR(255),
    reference VARCHAR(255) UNIQUE NOT NULL,
    amount_in_cents BIGINT NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'COP',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    product_id UUID REFERENCES products(id),
    signature VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view their own transactions
CREATE POLICY "Anyone can view transactions"
ON transactions
FOR SELECT
USING (true);

-- Allow anyone to create transactions
CREATE POLICY "Anyone can create transactions"
ON transactions
FOR INSERT
WITH CHECK (true);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on transactions
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();