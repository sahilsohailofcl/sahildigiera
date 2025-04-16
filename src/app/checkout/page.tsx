'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priceId = searchParams.get('priceId');
  const billingPeriod = searchParams.get('billingPeriod') || 'monthly';

  useEffect(() => {
    if (!priceId) {
      setError('Price ID is required');
      return;
    }
    console.log('Checkout page loaded with:', { priceId, billingPeriod });
  }, [priceId, billingPeriod]);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Initiating checkout with:', { priceId, billingPeriod });

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          billingPeriod,
        }),
      });

      const data = await response.json();
      console.log('Checkout response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Handle starter plan (free)
      if (data.success && data.redirectUrl) {
        router.push(data.redirectUrl);
        return;
      }

      // Handle paid plans
      if (data.url) {
        console.log('Redirecting to Stripe checkout:', data.url);
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create checkout session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Complete Your Purchase</h1>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-500">
            {error}
          </div>
        )}

        <div className="mb-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Plan:</span>
            <span>{billingPeriod === 'annual' ? 'Annual' : 'Monthly'}</span>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          disabled={loading || !priceId}
          className="w-full bg-[#317e31] hover:bg-[#50a826]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Proceed to Payment'
          )}
        </Button>
      </div>
    </div>
  );
} 