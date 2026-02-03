'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import Services from '@/components/services';
import WhyChoose from '@/components/why-choose';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
      <main className="min-h-screen bg-background">
        <Hero />

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              <div className="bg-gradient-warm rounded-lg p-8 shadow-cosmic animate-gradient-shift">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <Image
                    src="/logo1.jpeg"
                    alt="AstrobyAB logo"
                    width={96}
                    height={96}
                    className="h-12 w-12 object-contain rounded bg-white/80 p-1 shadow-cosmic"
                  />
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">AstrobyAB</p>
                    <h1 className="text-4xl font-display font-bold text-foreground">
                      Welcome, {session.user?.name || 'User'}!
                    </h1>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">
                  Explore your personalized cosmic guidance
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/book-consultation">
                  <div className="border-cosmic rounded-lg p-6 bg-gradient-mars text-white shadow-card hover:shadow-cosmic transition-all cursor-pointer hover-glow">
                    <div className="text-4xl mb-4">{'\u{1F4DD}'}</div>
                    <h3 className="text-lg font-display font-bold mb-2 text-black">
                      Book Consultation
                    </h3>
                    <p className="text-black/80 text-sm">
                      Schedule with an expert astrologer
                    </p>
                  </div>
                </Link>

                <Link href="/my-consultations">
                  <div className="border-cosmic rounded-lg p-6 bg-gradient-warm text-foreground shadow-card hover:shadow-cosmic transition-all cursor-pointer hover-glow">
                    <div className="text-4xl mb-4">{'\u{1F4C5}'}</div>
                    <h3 className="text-lg font-display font-bold mb-2 text-black">
                      My Consultations
                    </h3>
                    <p className="text-black/70 text-sm">
                      View your booking history
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Services />
        <WhyChoose />
      </main>
      <Footer />
    </>
  );
}
