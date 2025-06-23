-- Add chat_id column to orders table
ALTER TABLE public.orders
ADD COLUMN chat_id UUID UNIQUE REFERENCES public.chats(id);