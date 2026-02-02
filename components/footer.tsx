'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-cosmic text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-mars rounded-full flex items-center justify-center text-sm font-bold">
                AB
              </div>
              <div>
                <div className="text-cosmic-gold font-display font-bold">ASTRO BY AB</div>
                <div className="text-xs text-mars-300 font-serif">Vedic Astrology</div>
              </div>
            </div>
            <p className="text-mars-200 text-sm font-serif">
              As is the microcosm, so is the macrocosm
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white">QUICK LINKS</h4>
            <ul className="space-y-2 text-mars-200 text-sm">
              <li><Link href="/" className="hover:text-cosmic-gold transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-cosmic-gold transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-cosmic-gold transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-cosmic-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white">SERVICES</h4>
            <ul className="space-y-2 text-mars-200 text-sm">
              <li><Link href="/services/janam-kundli" className="hover:text-cosmic-gold transition-colors">Janam Kundli Analysis</Link></li>
              <li><Link href="/services/career-guidance" className="hover:text-cosmic-gold transition-colors">Career & Education Guidance</Link></li>
              <li><Link href="/services/marriage-matching" className="hover:text-cosmic-gold transition-colors">Marriage Matching</Link></li>
              <li><Link href="/services/health-wealth" className="hover:text-cosmic-gold transition-colors">Health & Wealth Astrology</Link></li>
              <li><Link href="/services/gemstone-remedies" className="hover:text-cosmic-gold transition-colors">Gemstone Remedies</Link></li>
              <li><Link href="/services/mantra-remedies" className="hover:text-cosmic-gold transition-colors">Mantra & Spiritual Remedies</Link></li>
              <li><Link href="/services/complete-astrology" className="hover:text-cosmic-gold transition-colors font-bold">Complete Package - ₹21,001</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white">CONTACT</h4>
            <ul className="space-y-2 text-mars-200 text-sm">
              <li>Email: contact@astrobyab.com</li>
              <li>Phone: +91 XXXXXXXXXX</li>
              <li>Available: Mon - Sun</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-mars-200 text-sm">
              © 2025 AstrobyAB. All rights reserved.
            </p>
            <p className="text-mars-200 text-sm font-serif">
              || भारतीय ज्योतिष ||
            </p>
            <p className="text-mars-200 text-sm">
              Authentic • Confidential • Vedic Wisdom Backed Guidance
            </p>
          </div>
        </div>
      </div>

      {/* Chat Icon */}
      <div className="fixed bottom-6 right-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:shadow-cosmic transition-all shadow-cosmic">
        <span className="text-white text-xl animate-cosmic-pulse">💬</span>
      </div>
    </footer>
  );
}
