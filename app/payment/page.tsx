export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import PaymentClient from './payment-client';

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading payment...
        </div>
      }
    >
      <PaymentClient />
    </Suspense>
  );
}
