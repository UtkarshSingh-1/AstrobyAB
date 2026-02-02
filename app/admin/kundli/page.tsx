'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminKundli() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/unauthorized');
  }

  const kundlis = [
    {
      id: 1,
      name: 'Rahul Sharma',
      birthDate: '1990-05-15',
      birthTime: '10:30 AM',
      birthPlace: 'Delhi',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Anjali Gupta',
      birthDate: '1995-08-22',
      birthTime: '02:45 PM',
      birthPlace: 'Mumbai',
      status: 'Pending Analysis',
    },
    {
      id: 3,
      name: 'Vikram Singh',
      birthDate: '1988-12-10',
      birthTime: '11:20 AM',
      birthPlace: 'Bangalore',
      status: 'In Progress',
    },
  ];

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
                  Kundli Records
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage birth chart records
                </p>
              </div>
              <Link href="/admin/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>

            {/* Kundli Records Table */}
            <div className="border-cosmic rounded-lg overflow-hidden bg-card shadow-cosmic">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-mars text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Birth Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Birth Time</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Birth Place
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {kundlis.map((kundli) => (
                      <tr key={kundli.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground font-medium">
                          {kundli.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(kundli.birthDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {kundli.birthTime}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {kundli.birthPlace}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              kundli.status === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : kundli.status === 'Pending Analysis'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {kundli.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
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
