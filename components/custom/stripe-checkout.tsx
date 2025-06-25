'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

import { Button } from '@/components/ui/button';

import { useStripe } from './stripe-provider';

interface StripeCheckoutProps {
  orderId: string;
  chatId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function StripeCheckout({ orderId, chatId, onSuccess, onCancel }: StripeCheckoutProps) {
  const { stripe, loading } = useStripe();
  const [isProcessing, setIsProcessing] = useState(false);
  const { mutate } = useSWRConfig();

  const handleCheckout = async () => {
    if (!stripe) {
      toast.error('Stripe is not loaded');
      return;
    }

    setIsProcessing(true);

    try {
      // Create checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        toast.error(error.message || 'Checkout failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <Button disabled className="w-full">
        Loading...
      </Button>
    );
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isProcessing}
      className="w-full"
    >
      {isProcessing ? 'Processing...' : 'Pay Now'}
    </Button>
  );
}
