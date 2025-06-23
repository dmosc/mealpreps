import { tool } from 'ai';
import { z } from 'zod';
import { getMenuProductsQuery } from '../db/queries';
import type { Client } from '../lib/supabase/types';
import { createClient } from '../lib/supabase/server';
import { getOrCreateOrderForChat, addOrderItem } from '../db/mutations';

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
      modifications: z.any().optional().describe('Optional modifications for the item'),
    }),
    execute: async ({ productName, quantity, modifications }) => {
      console.log("Calling addItemToOrderTool");
      if (!chatId || !userId) {
        throw new Error('chatId and userId must be provided in context');
      }
      // Query the products table for a matching product name
      const client: Client = await createClient();
      const products = await getMenuProductsQuery(client, { name: productName });
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
