'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { InvoiceIcon, TrashIcon } from './icons';

export function ShoppingCart({ order }: { order?: any }) {
  const [open, setOpen] = useState(false);
  const { mutate } = useSWRConfig();

  // Calculate subtotal from order items
  const subtotal = useMemo(() => {
    if (!order?.items) return 0;
    return order.items.reduce((sum: number, item: any) => {
      return sum + item.price * item.quantity;
    }, 0);
  }, [order?.items]);

  const handleRemoveItem = async (orderItemId: string) => {
    try {
      const res = await fetch('/api/order', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderItemId }),
      });

      if (!res.ok) throw new Error('Failed to remove item');

      toast.success('Item removed from order');

      // Refetch order status to update UI
      if (order.chat_id) {
        mutate(`/api/order?chatId=${order.chat_id}`);
      }
    } catch (err) {
      toast.error('Failed to remove item. Please try again.');
    }
  };

  // Show loading state
  if (!order) {
    return (
      <Button variant="outline" className="md:px-2 md:h-[34px]" disabled>
        <InvoiceIcon size={14} />
      </Button>
    );
  }

  // Show empty state if no order or no items
  if (!order.items || order.items.length === 0) {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="md:px-2 md:h-[34px]">
            <InvoiceIcon size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[250px] w-full p-3">
          <div className="text-sm text-muted-foreground text-center py-4">
            No items in cart
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="md:px-2 md:h-[34px] relative">
          <InvoiceIcon size={14} />
          {order?.items && order.items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-4 flex items-center justify-center">
              {order.items.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[250px] w-full p-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-sm">Shopping Cart</h3>
        </div>
        {order.items.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2 py-2"
          >
            <div className="flex flex-col gap-1 items-start truncate flex-1">
              <div className="font-medium">
                {item.products?.name || 'Unknown Item'}
              </div>
              <div className="text-xs text-muted-foreground">
                Qty: {item.quantity} × ${item.price.toFixed(2)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {order.status !== 'submitted' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveItem(item.id);
                  }}
                >
                  <TrashIcon size={12} />
                </Button>
              )}
            </div>
          </div>
        ))}
        <div className="flex flex-row justify-between items-center py-2 border-t">
          <div className="flex flex-col gap-1 items-start font-bold">
            Subtotal
          </div>
          <div className="text-xs text-muted-foreground font-bold">
            ${subtotal.toFixed(2)}
          </div>
        </div>
        {order.status === 'submitted' ? (
          <div className="flex flex-col gap-2 mt-5">
            <Button className="w-full" variant="outline" disabled>
              Order submitted
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => {
                // If a callback is provided in props, call it, otherwise redirect
                if (typeof window !== 'undefined') {
                  window.location.href = '/';
                }
              }}
            >
              Start a new order
            </Button>
          </div>
        ) : (
          <Button
            className="w-full mt-5"
            variant="destructive"
            onClick={async () => {
              if (!order?.id) return;
              try {
                const res = await fetch('/api/order', {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    orderId: order.id,
                    status: 'submitted',
                  }),
                });
                if (!res.ok) throw new Error('Failed to submit order');
                toast.success(
                  'Order submitted! You should receive an email confirming your order.'
                );
                setOpen(false);
                // Refetch order status to update UI
                if (order.chat_id) {
                  mutate(`/api/order?chatId=${order.chat_id}`);
                }
              } catch (err) {
                toast.error('Failed to submit order. Please try again.');
              }
            }}
          >
            Submit order
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
