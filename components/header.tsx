'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services/janam-kundli', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleSignOut = () => signOut({ callbackUrl: '/' });

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo1.jpeg"
            alt="Astro by AB"
            width={140}
            height={40}
            className="h-10 w-auto animate-glow"
            priority
          />
          <span className="font-display text-lg font-semibold text-mars-500 tracking-wide">
            AstrobyAB
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-foreground">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          {session?.user ? (
            <>
              <Link href="/profile">
                <Button variant="ghost" className="hover-tilt">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="outline" onClick={handleSignOut} className="hover-tilt">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin"><Button variant="ghost" className="hover-tilt">Sign In</Button></Link>
              <Link href="/signup"><Button className="hover-glow">Get Started</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
