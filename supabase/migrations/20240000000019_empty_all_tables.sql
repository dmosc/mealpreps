-- Migration to empty all tables in the public domain
-- This script truncates all tables in the correct order to respect foreign key constraints

-- Disable triggers temporarily to avoid conflicts during truncation
SET session_replication_role = replica;

-- Empty tables in order (child tables first, then parent tables)
-- Start with tables that have foreign key dependencies

-- 1. Empty order_items (depends on orders and products)
TRUNCATE TABLE public.order_items CASCADE;

-- 2. Empty orders (depends on users and chats)
TRUNCATE TABLE public.orders CASCADE;

-- 3. Empty votes (depends on messages and chats)
TRUNCATE TABLE public.votes CASCADE;

-- 4. Empty messages (depends on chats)
TRUNCATE TABLE public.messages CASCADE;

-- 5. Empty chats (depends on users)
TRUNCATE TABLE public.chats CASCADE;

-- 6. Empty products (no dependencies)
TRUNCATE TABLE public.products CASCADE;

-- 7. Empty users (parent table, but keep auth.users intact)
-- Note: We don't truncate users table as it's linked to auth.users
-- Instead, we'll delete all records except those that exist in auth.users
DELETE FROM public.users 
WHERE id NOT IN (SELECT id FROM auth.users);

-- Re-enable triggers
SET session_replication_role = DEFAULT;

-- Reset sequences if any exist
-- Note: Most tables use UUID primary keys, but if there are any serial sequences, they would be reset here
-- ALTER SEQUENCE IF EXISTS public.your_sequence_name RESTART WITH 1; 