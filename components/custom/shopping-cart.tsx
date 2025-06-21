'use client';

import { startTransition, useMemo, useOptimistic, useState } from 'react';

import { models } from '@/ai/models';
import { saveModelId } from '@/app/(chat)/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { CheckCirclFillIcon, InvoiceIcon } from './icons';

const sampleOrder = [
  { id: 123, name: 'Tacos', price: 15 },
  { id: 456, name: 'Enchiladas', price: 17 },
];

export function ShoppingCart() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="md:px-2 md:h-[34px]">
          <InvoiceIcon size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[250px] w-full p-3">
        {sampleOrder.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="gap-4 flex flex-row justify-between items-center"
          >
            <div className="flex flex-col gap-1 items-start truncate">{item.name}</div>
            <div className="text-xs text-muted-foreground">${item.price}</div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1 items-start font-bold">Subtotal</div>
          <div className="text-xs text-muted-foreground font-bold">
            ${sampleOrder.reduce((sum, order) => sum + order.price, 0)}
          </div>
        </DropdownMenuItem>
        <Button className="w-full mt-5" variant="destructive">
          Submit payment
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
