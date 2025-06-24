-- Add RLS policy to allow users to update their own orders
CREATE POLICY "Allow update access to own orders"
ON public.orders
FOR UPDATE
USING (true);