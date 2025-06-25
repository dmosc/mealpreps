'use client';

import { User } from '@supabase/supabase-js';
import { format } from 'date-fns';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';

import { InvoiceIcon } from '@/components/custom/icons';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Order = Database['public']['Tables']['orders']['Row'] & {
  order_items: Array<{
    id: string;
    quantity: number;
    price: number;
    modifications: any;
    products: {
      id: string;
      name: string;
    } | null;
  }>;
};

const fetcher = async (): Promise<Order[]> => {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Auth error:', userError);
      return [];
    }

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(
        `
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
      `
      )
      .eq('user_id', user.id)
      .eq('status', 'submitted')
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Orders fetch error:', ordersError);
      return [];
    }

    return orders || [];
  } catch (error) {
    console.error('Fetcher error:', error);
    return [];
  }
};

const OrderItem = ({
  order,
  isActive,
  setOpenMobile,
}: {
  order: Order;
  isActive: boolean;
  setOpenMobile: (open: boolean) => void;
}) => {
  const totalItems =
    order.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalPrice =
    order.order_items?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0;
  const orderDate = format(new Date(order.created_at), 'MMM d, yyyy');

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} className="py-8 px-3 m-2">
        <Link
          href={`/chat/${order.chat_id}`}
          onClick={() => setOpenMobile(false)}
        >
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <InvoiceIcon size={12} />
              <span className="text-sm font-medium">
                Order #{order.id.slice(-8)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {totalItems} items • ${totalPrice.toFixed(2)} • {orderDate}
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function SidebarOrders({ user }: { user: User | undefined }) {
  const { setOpenMobile } = useSidebar();
  const { id } = useParams();
  const {
    data: orders,
    isLoading,
    mutate,
  } = useSWR<Order[]>(user ? ['submitted-orders', user.id] : null, fetcher, {
    fallbackData: [],
    refreshInterval: 10000, // Refresh every 10 seconds
    revalidateOnFocus: true,
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <SidebarGroup>
        <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
          Submitted Orders
        </div>
        <SidebarGroupContent>
          <div className="flex flex-col">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-md h-12 flex gap-2 px-2 items-center"
              >
                <div className="h-4 rounded-md flex-1 bg-sidebar-accent-foreground/10" />
              </div>
            ))}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <SidebarGroup>
        <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
          Submitted Orders
        </div>
        <SidebarGroupContent>
          <div className="text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2 px-2 py-4">
            <div>No submitted orders yet</div>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <div className="mx-4 text-sm">Submitted</div>
      <SidebarGroupContent>
        <SidebarMenu>
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              isActive={order.chat_id === id}
              setOpenMobile={setOpenMobile}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
