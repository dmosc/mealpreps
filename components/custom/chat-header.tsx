'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

import { ModelSelector } from '@/components/custom/model-selector';
import { ShoppingCart } from '@/components/custom/shopping-cart';
import { SidebarToggle } from '@/components/custom/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { BetterTooltip } from '@/components/ui/tooltip';

import { PlusIcon } from './icons';
import { useSidebar } from '../ui/sidebar';

export function ChatHeader({ order }: { order?: any }) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />
      <BetterTooltip content="New order">
        <Button
          variant="outline"
          className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
          onClick={() => {
            router.push('/chat');
            router.refresh();
          }}
        >
          <PlusIcon />
          <span className="md:sr-only">New order</span>
        </Button>
      </BetterTooltip>
      {/* {(!open || windowWidth < 768) && (
      )} */}
      <ShoppingCart order={order} />
    </header>
  );
}
