'use client';

import { loadStripe } from '@stripe/stripe-js';
import { createContext, useContext, useEffect, useState } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripeContextType {
  stripe: any;
  loading: boolean;
}

const StripeContext = createContext<StripeContextType>({
  stripe: null,
  loading: true,
});

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripe must be used within a StripeProvider');
  }
  return context;
};

export function StripeProvider({ children }: { children: React.ReactNode }) {
  const [stripe, setStripe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    stripePromise.then((stripeInstance) => {
      setStripe(stripeInstance);
      setLoading(false);
    });
  }, []);

  return (
    <StripeContext.Provider value={{ stripe, loading }}>
      {children}
    </StripeContext.Provider>
  );
}
