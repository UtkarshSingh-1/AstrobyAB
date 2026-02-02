'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';

interface DashboardStats {
  totalUsers: number;
  totalConsultations: number;
  pendingPayments: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalConsultations: 0,
    pendingPayments: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      redirect('/unauthorized');
    }
  }, [session, status]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('[v0] Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchStats();
    }
  }, [status]);

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/unauthorized');
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-mars text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-display font-bold mb-4">Admin Control Center</h1>
              <p className="text-xl text-white/80">
                Welcome, {session.user?.name}! Manage consultations, users, pricing, and operations
              </p>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-12 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/50 backdrop-blur-sm border-cosmic rounded-lg p-6 text-center">
                <div className="text-3xl font-display font-bold text-gradient-mars mb-2">{stats.totalUsers}</div>
                <p className="text-muted-foreground font-medium">Total Users</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border-cosmic rounded-lg p-6 text-center">
                <div className="text-3xl font-display font-bold text-gradient-mars mb-2">{stats.totalConsultations}</div>
                <p className="text-muted-foreground font-medium">Total Consultations</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border-cosmic rounded-lg p-6 text-center">
                <div className="text-3xl font-display font-bold text-gradient-mars mb-2">{stats.pendingPayments}</div>
                <p className="text-muted-foreground font-medium">Pending Payments</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border-cosmic rounded-lg p-6 text-center">
                <div className="text-3xl font-display font-bold text-gradient-mars mb-2">₹{stats.totalRevenue.toFixed(0)}</div>
                <p className="text-muted-foreground font-medium">Total Revenue</p>
              </div>
            </div>
          </div>
        </section>

        {/* Management Options */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold mb-12 text-center">Management Tools</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Manage Users',
                  description: 'View and manage all registered users',
                  href: '/admin/users',
                  icon: '👥',
                  color: 'bg-gradient-mars',
                },
                {
                  title: 'View Consultations',
                  description: 'Track all consultation bookings',
                  href: '/admin/consultations',
                  icon: '📞',
                  color: 'bg-gradient-warm',
                },
                {
                  title: 'Service Pricing',
                  description: 'Set and update service prices',
                  href: '/admin/pricing',
                  icon: '💰',
                  color: 'bg-blue-500',
                },
                {
                  title: 'User Kundli Records',
                  description: 'Manage user kundli data',
                  href: '/admin/kundli',
                  icon: '📋',
                  color: 'bg-purple-500',
                },
              ].map((item, idx) => (
                <Link key={idx} href={item.href} className="group">
                  <div className="h-full bg-white/50 backdrop-blur-sm border-cosmic rounded-lg p-8 hover:shadow-cosmic transition-all hover:scale-105">
                    <div className={`${item.color} text-white w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.description}
                    </p>
                    <Button className="w-full bg-gradient-mars text-white">
                      Access →
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
