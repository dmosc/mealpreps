import { tool } from 'ai';
import { z } from 'zod';
import { getMenuProductsQuery } from '../db/queries';
import type { Client } from '../lib/supabase/types';
import { createClient } from '../lib/supabase/server';

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
