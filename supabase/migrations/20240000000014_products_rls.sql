-- Allow public read access to products
CREATE POLICY "Allow read access to all products"
ON public.products
FOR SELECT
USING (true);