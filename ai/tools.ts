import { tool } from 'ai';
import { z } from 'zod';
import { getMenuProductsQuery } from '../db/queries';
import type { Client } from '../lib/supabase/types';
import { createClient } from '../lib/supabase/server';
import { getOrCreateOrderForChat, addOrderItem, removeOrderItem } from '../db/mutations';

export const menuQueryTool = () =>
  tool({
    description:
      'Query the menu for products with filters like price, category, or name.',
    parameters: z.object({
      maxPrice: z.number().optional(),
      minPrice: z.number().optional(),
      category: z.string().optional(),
      name: z.string().optional(),
    }),
    execute: async (args) => {
      const client: Client = await createClient();
      const products = await getMenuProductsQuery(client, args);
      if (!products || products.length === 0) {
        return 'No menu items found matching your criteria.';
      }
      return products
        .map(
          (item) =>
            `* ${item.name} ($${item.price}): ${item.quantity} ${item.units}${item.description ? ' — ' + item.description : ''}`
        )
        .join('\n');
    },
  });

export const addItemToOrderTool = (chatId: string, userId: string) =>
  tool({
    description:
      'Add an item to the current order in a chat by product name. If no order exists for the chat, create one and associate it. Then add the item to the order.',
    parameters: z.object({
      productName: z.string().describe('The name of the product to add'),
      quantity: z.number().min(1).describe('Quantity of the product'),
      modifications: z
        .any()
        .optional()
        .describe('Optional modifications for the item'),
    }),
    execute: async ({ productName, quantity, modifications }) => {
      console.log('Calling addItemToOrderTool');
      if (!chatId || !userId) {
        throw new Error('chatId and userId must be provided in context');
      }
      // Query the products table for a matching product name
      const client: Client = await createClient();
      const products = await getMenuProductsQuery(client, {
        name: productName,
      });
      if (!products || products.length === 0) {
        return `No product found matching the name: ${productName}`;
      }
      // Use the first matching product
      const product = products[0];
      const order = await getOrCreateOrderForChat(chatId, userId);
      const item = await addOrderItem({
        orderId: order.id,
        productId: product.id,
        quantity,
        price: product.price,
        modifications,
      });
      return `Added ${quantity} of '${product.name}' to order ${order.id} for chat ${chatId}.`;
    },
  });

export const removeItemFromOrderTool = (chatId: string, userId: string) =>
  tool({
    description:
      'Remove an item from the current order in a chat by product name. This will remove the first matching item found.',
    parameters: z.object({
      productName: z.string().describe('The name of the product to remove'),
    }),
    execute: async ({ productName }) => {
      console.log('Calling removeItemFromOrderTool');
      if (!chatId || !userId) {
        throw new Error('chatId and userId must be provided in context');
      }
      
      const client: Client = await createClient();
      
      // Get the order with items for this chat
      const { data: order, error: orderError } = await client
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            quantity,
            price,
            modifications,
            products (
              id,
              name
            )
          )
        `)
        .eq('chat_id', chatId)
        .eq('user_id', userId)
        .single();
      
      if (orderError || !order) {
        return `No order found for chat ${chatId}`;
      }
      
      if (!order.order_items || order.order_items.length === 0) {
        return `No items found in order for chat ${chatId}`;
      }
      
      // Find the first matching item
      const matchingItem = order.order_items.find(
        (item: any) => item.products?.name?.toLowerCase().includes(productName.toLowerCase())
      );
      
      if (!matchingItem) {
        return `No item found matching the name: ${productName}`;
      }
      
      // Remove the item
      await removeOrderItem({
        orderItemId: matchingItem.id,
        userId,
      });
      
      return `Removed '${matchingItem.products?.name || 'Unknown Item'}' from order ${order.id} for chat ${chatId}.`;
    },
  });
