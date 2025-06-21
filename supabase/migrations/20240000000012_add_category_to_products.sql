-- Add category enum type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_category') THEN
        CREATE TYPE product_category AS ENUM ('breakfast', 'entree', 'sandwich', 'flatbread', 'dessert');
    END IF;
END$$;

-- Add category column to products table
ALTER TABLE public.products ADD COLUMN category product_category; 