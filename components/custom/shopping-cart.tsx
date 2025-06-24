'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { InvoiceIcon } from './icons';

export function ShoppingCart({ order }: { order?: any }) {
  const [open, setOpen] = useState(false);

  // Calculate subtotal from order items
  const subtotal = useMemo(() => {
    if (!order?.items) return 0;
    return order.items.reduce((sum: number, item: any) => {
      return sum + item.price * item.quantity;
    }, 0);
  }, [order?.items]);

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
          <DropdownMenuItem
            key={item.id}
            className="gap-4 flex flex-row justify-between items-center"
          >
            <div className="flex flex-col gap-1 items-start truncate">
              <div className="font-medium">
                {item.products?.name || 'Unknown Item'}
              </div>
              <div className="text-xs text-muted-foreground">
                Qty: {item.quantity}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1 items-start font-bold">
            Subtotal
          </div>
          <div className="text-xs text-muted-foreground font-bold">
            ${subtotal.toFixed(2)}
          </div>
        </DropdownMenuItem>
        <Button className="w-full mt-5" variant="destructive">
          Submit payment
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
