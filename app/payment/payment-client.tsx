'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function PaymentClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const consultationId = searchParams.get('consultationId');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePay = async () => {
    if (!consultationId) {
      toast.error('Missing consultation ID');
      return;
    }

    if (!session?.user) {
      toast.error('Please sign in to continue');
      router.push('/signin');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consultationId, paymentMethod }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Payment successful!');
        router.push('/my-consultations');
      } else {
        toast.error(data.error || 'Payment failed');
      }
    } catch (error) {
      console.error('[v0] Payment error:', error);
      toast.error('Payment error');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-xl">
          <Card className="p-8 border-cosmic">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">
                  Complete Payment
                </h1>
                <p className="text-muted-foreground">
                  Choose a payment method to confirm your booking.
                </p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Card
                </label>
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  UPI
                </label>
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Wallet
                </label>
              </div>

              <Button
                onClick={handlePay}
                disabled={loading}
                className="w-full bg-gradient-mars text-white"
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
