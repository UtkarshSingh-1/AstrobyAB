'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    redirect('/signin');
  }

  if (session.user?.role === 'ADMIN') {
    redirect('/admin/dashboard');
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-warm rounded-lg p-8 shadow-cosmic">
              <h1 className="text-4xl font-display font-bold text-foreground mb-2">
                Welcome, {session.user?.name || 'User'}!
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore your personalized cosmic guidance
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/book-consultation">
                <div className="border-cosmic rounded-lg p-6 bg-gradient-mars text-white shadow-card hover:shadow-cosmic transition-all cursor-pointer">
                  <div className="text-4xl mb-4">📞</div>
                  <h3 className="text-lg font-display font-bold mb-2">
                    Book Consultation
                  </h3>
                  <p className="text-white/80 text-sm">
                    Schedule with an expert astrologer
                  </p>
                </div>
              </Link>

              <Link href="/my-consultations">
                <div className="border-cosmic rounded-lg p-6 bg-gradient-warm text-foreground shadow-card hover:shadow-cosmic transition-all cursor-pointer">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-lg font-display font-bold mb-2">
                    My Consultations
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    View your booking history
                  </p>
                </div>
              </Link>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: '\u2600\uFE0F',
                  title: 'Janam Kundli',
                  description: 'View your birth chart analysis',
                  href: '/services/janam-kundli',
                },
                {
                  icon: '\uD83D\uDCBC',
                  title: 'Career Guidance',
                  description: 'Get career recommendations',
                  href: '/services/career-guidance',
                },
                {
                  icon: '\u2764\uFE0F',
                  title: 'Relationship Matching',
                  description: 'Explore compatibility',
                  href: '/services/marriage-matching',
                },
                {
                  icon: '\u2B50',
                  title: 'Health & Wealth',
                  description: 'Planetary insights for wellbeing',
                  href: '/services/health-wealth',
                },
                {
                  icon: '\uD83D\uDC8E',
                  title: 'Gemstone Remedies',
                  description: 'Discover your gemstones',
                  href: '/services/gemstone-remedies',
                },
                {
                  icon: '\uD83C\uDF19',
                  title: 'Mantra Remedies',
                  description: 'Sacred mantras for you',
                  href: '/services/mantra-remedies',
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="border-cosmic rounded-lg p-6 bg-card shadow-card hover:shadow-cosmic transition-all"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <Link href={service.href}>
                    <Button
                      variant="outline"
                      className="w-full text-sm border-cosmic bg-transparent"
                    >
                      Explore
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Profile Section */}
            <div className="border-cosmic rounded-lg p-8 bg-card">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Profile Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">
                    Name
                  </label>
                  <p className="text-lg font-medium text-foreground">
                    {session.user?.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">
                    Email
                  </label>
                  <p className="text-lg font-medium text-foreground">
                    {session.user?.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">
                    Role
                  </label>
                  <p className="text-lg font-medium text-foreground capitalize">
                    {session.user?.role || 'User'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">
                    Member Since
                  </label>
                  <p className="text-lg font-medium text-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/">
                  <Button className="bg-gradient-mars text-white">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
