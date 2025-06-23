-- Allow public insert access to orders
CREATE POLICY "Allow insert access to all orders"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- Allow public insert access to order_items
CREATE POLICY "Allow insert access to all order_items"
ON public.order_items
FOR INSERT
WITH CHECK (true); 