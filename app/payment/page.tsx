'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface Consultation {
  id: string;
  name: string;
  email: string;
  serviceName: string;
  price: number;
  paymentStatus: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const consultationId = searchParams.get('consultationId');
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  useEffect(() => {
    if (consultationId) {
      fetchConsultation();
    }
  }, [consultationId]);

  const fetchConsultation = async () => {
    try {
      const response = await fetch(`/api/consultations/${consultationId}`);
      if (response.ok) {
        const data = await response.json();
        setConsultation(data.consultation);
      }
    } catch (error) {
      console.error('[v0] Failed to fetch consultation:', error);
      toast.error('Failed to load consultation details');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    try {
      if (paymentMethod === 'razorpay') {
        // For now, simulate successful payment
        // In production, integrate with Razorpay API
        const response = await fetch(`/api/payment/confirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            consultationId,
            paymentMethod: 'razorpay',
          }),
        });

        if (response.ok) {
          toast.success('Payment successful!');
          setTimeout(() => router.push('/dashboard'), 2000);
        } else {
          toast.error('Payment failed. Please try again');
        }
      }
    } catch (error) {
      console.error('[v0] Payment error:', error);
      toast.error('Error processing payment');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!consultation) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Consultation not found</p>
            <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="space-y-8">
            <div className="bg-gradient-mars rounded-lg p-8 shadow-cosmic text-white">
              <h1 className="text-4xl font-display font-bold mb-2">Complete Payment</h1>
              <p className="text-white/80">Securely complete your consultation booking</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold">Order Summary</h2>
                <Card className="p-6 border-cosmic space-y-4">
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-display font-bold text-lg">{consultation.serviceName}</p>
                  </div>
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">Client Name</p>
                    <p className="font-bold">{consultation.name}</p>
                  </div>
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-bold text-sm">{consultation.email}</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
                    <p className="text-3xl font-display font-bold text-gradient-mars">
                      ₹{consultation.price.toFixed(0)}
                    </p>
                  </div>
                </Card>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold">Payment Method</h2>
                <Card className="p-6 border-cosmic space-y-6">
                  <div className="space-y-3">
                    <label className="flex items-center p-3 border-2 border-border rounded-lg cursor-pointer hover:border-gradient-mars transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={paymentMethod === 'razorpay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <span className="font-medium">Razorpay</span>
                      <span className="text-sm text-muted-foreground ml-auto">Secure Online Payment</span>
                    </label>

                    <label className="flex items-center p-3 border-2 border-border rounded-lg cursor-pointer opacity-50">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        disabled
                        className="mr-3"
                      />
                      <span className="font-medium">Bank Transfer</span>
                      <span className="text-sm text-muted-foreground ml-auto">Coming Soon</span>
                    </label>
                  </div>

                  {paymentMethod === 'razorpay' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        You will be redirected to Razorpay's secure payment gateway to complete your payment.
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full bg-gradient-mars text-white"
                  >
                    {processing ? 'Processing...' : `Pay ₹${consultation.price.toFixed(0)}`}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="w-full bg-transparent"
                  >
                    Cancel Payment
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By proceeding, you agree to our terms and conditions
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
