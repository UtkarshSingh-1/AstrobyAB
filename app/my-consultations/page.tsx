'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UserConsultation {
  id: string;
  serviceName: string;
  price: number;
  paymentStatus: string;
  createdAt: string;
}

export default function MyConsultations() {
  const { data: session, status } = useSession();
  const [consultations, setConsultations] = useState<UserConsultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/signin');
    }
  }, [status]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await fetch('/api/user/consultations');
        if (response.ok) {
          const data = await response.json();
          setConsultations(data.consultations || []);
        }
      } catch (error) {
        console.error('[v0] Failed to fetch consultations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchConsultations();
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    redirect('/signin');
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-display font-bold text-foreground">
                  My Consultations
                </h1>
                <p className="text-muted-foreground mt-2">
                  Total Bookings: {consultations.length}
                </p>
              </div>
              <Link href="/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>

            {/* Consultations Table */}
            <div className="border-cosmic rounded-lg overflow-hidden bg-card shadow-cosmic">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-mars text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {consultations.length > 0 ? (
                      consultations.map((consultation) => (
                        <tr
                          key={consultation.id}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-foreground font-medium">
                            {consultation.serviceName}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            ₹{consultation.price}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                consultation.paymentStatus === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : consultation.paymentStatus === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {consultation.paymentStatus.charAt(0).toUpperCase() +
                                consultation.paymentStatus.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(consultation.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-8 text-center text-muted-foreground"
                        >
                          No consultations yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Book New Consultation */}
            <div className="text-center">
              <Link href="/book-consultation">
                <Button className="bg-gradient-mars text-white">
                  Book a New Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
