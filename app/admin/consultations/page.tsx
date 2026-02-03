'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import ConsultationDetailsDialog from '@/components/consultation-details-dialog';
import Link from 'next/link';

interface Consultation {
  id: string;
  name: string;
  email: string;
  serviceName: string;
  paymentStatus: string;
  price: number;
  createdAt: string;
  consultationDate?: string | null;
  birthPlace?: string | null;
  birthDate?: string | null;
  birthTime?: string | null;
  consultationPurpose?: string | null;
}

export default function AdminConsultations() {
  const { data: session, status } = useSession();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      redirect('/unauthorized');
    }
  }, [session, status]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await fetch('/api/admin/consultations');
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

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/unauthorized');
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
                  Consultations
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage client consultations
                </p>
              </div>
              <Link href="/admin/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>

            {/* Consultations Table */}
            <div className="border-cosmic rounded-lg overflow-hidden bg-card shadow-cosmic">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-mars text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Client</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Birth Details</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Purpose</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Preferred Date</th>
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
                            {consultation.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {consultation.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {consultation.serviceName}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            ₹{consultation.price}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            <div className="space-y-1">
                              <div>{consultation.birthPlace || '-'}</div>
                              <div>
                                {consultation.birthDate
                                  ? new Date(consultation.birthDate).toLocaleDateString()
                                  : '-'}
                                {consultation.birthTime ? ` - ${consultation.birthTime}` : ''}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs">
                            {consultation.consultationPurpose || '-'}
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
                            {consultation.consultationDate
                              ? new Date(consultation.consultationDate).toLocaleDateString()
                              : new Date(consultation.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <ConsultationDetailsDialog
                              triggerLabel="View"
                              title="Consultation Details"
                              fields={[
                                { label: 'Client', value: consultation.name },
                                { label: 'Email', value: consultation.email },
                                { label: 'Service', value: consultation.serviceName },
                                { label: 'Amount', value: `INR ${consultation.price}` },
                                {
                                  label: 'Preferred Date',
                                  value: consultation.consultationDate
                                    ? new Date(consultation.consultationDate).toLocaleString()
                                    : new Date(consultation.createdAt).toLocaleString(),
                                },
                                { label: 'Birth Place', value: consultation.birthPlace || '-' },
                                {
                                  label: 'Birth Date',
                                  value: consultation.birthDate
                                    ? new Date(consultation.birthDate).toLocaleDateString()
                                    : '-',
                                },
                                { label: 'Birth Time', value: consultation.birthTime || '-' },
                                {
                                  label: 'Purpose',
                                  value: consultation.consultationPurpose || '-',
                                },
                                {
                                  label: 'Payment Status',
                                  value: consultation.paymentStatus,
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-6 py-8 text-center text-muted-foreground"
                        >
                          No consultations found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
