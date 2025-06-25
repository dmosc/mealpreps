'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

interface PaymentStatusHandlerProps {
  chatId: string;
}

export function PaymentStatusHandler({ chatId }: PaymentStatusHandlerProps) {
  const searchParams = useSearchParams();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success === 'true') {
      toast.success('Payment successful! Your order has been confirmed.');
      // Refetch order status
      mutate(`/api/order?chatId=${chatId}`);
    } else if (canceled === 'true') {
      toast.info('Payment was canceled.');
    }
  }, [searchParams, chatId, mutate]);

  return null; // This component doesn't render anything
} 