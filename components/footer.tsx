'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-cosmic text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-mars rounded-full flex items-center justify-center text-sm font-bold">
                AB
              </div>
              <div>
                <div className="text-cosmic-gold font-display font-bold">
                  ASTRO BY AB
                </div>
                <div className="text-xs text-mars-300 font-serif">
                  Vedic Astrology
                </div>
              </div>
            </div>
            <p className="text-mars-200 text-sm font-serif">
              As is the microcosm, so is the macrocosm
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-mars-200 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white">
              SERVICES
            </h4>
            <ul className="space-y-2 text-mars-200 text-sm">
              <li><Link href="/services/janam-kundli">Janam Kundli</Link></li>
              <li><Link href="/services/career-guidance">Career Guidance</Link></li>
              <li><Link href="/services/marriage-matching">Marriage Matching</Link></li>
              <li><Link href="/services/health-wealth">Health & Wealth</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white">
              CONTACT
            </h4>
            <ul className="space-y-2 text-mars-200 text-sm">
              <li>Email: contact@astrobyab.com</li>
              <li>Phone: +91 XXXXXXXXXX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-mars-200">
          © 2025 AstrobyAB. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
