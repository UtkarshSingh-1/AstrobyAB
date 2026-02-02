'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dashboardLink =
    session?.user?.role === 'ADMIN'
      ? '/admin/dashboard'
      : '/dashboard';

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold">
          Astro by AB
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/services/janam-kundli">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="hidden md:flex gap-3">
          {session?.user ? (
            <>
              <Link href={dashboardLink}>
                <Button variant="ghost">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" onClick={() => signOut()}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin"><Button variant="ghost">Sign In</Button></Link>
              <Link href="/signup"><Button>Get Started</Button></Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
