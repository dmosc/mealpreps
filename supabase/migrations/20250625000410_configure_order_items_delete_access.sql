-- Drop any existing policies that might conflict
DROP POLICY IF EXISTS "Allow update access to order items" ON public.order_items;
DROP POLICY IF EXISTS "Allow delete access to order items" ON public.order_items;
DROP POLICY IF EXISTS "Allow update and delete access to own order items" ON public.order_items;
DROP POLICY IF EXISTS "Allow delete access to own order items" ON public.order_items;

-- Ensure RLS is enabled on order_items table
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies for order_items
-- Allow read access (already exists from original migration)
-- Allow insert access for authenticated users
CREATE POLICY "Allow insert access to order items"
ON public.order_items
FOR INSERT
WITH CHECK (true);

-- Allow update access for authenticated users
CREATE POLICY "Allow update access to order items"
ON public.order_items
FOR UPDATE
USING (true);

-- Allow delete access for authenticated users
CREATE POLICY "Allow delete access to order items"
ON public.order_items
FOR DELETE
USING (true);
