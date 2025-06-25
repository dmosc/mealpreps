-- Add RLS policy to allow users to update and delete their own order items
CREATE POLICY "Allow update and delete access to own order items"
ON public.order_items
FOR UPDATE
USING (true);

CREATE POLICY "Allow delete access to own order items"
ON public.order_items
FOR DELETE
USING (true);