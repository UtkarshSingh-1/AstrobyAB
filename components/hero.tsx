'use client';

import AuthAction from '@/components/auth-action';
import Link from 'next/link';
import { useState } from 'react';

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = ((y / rect.height) - 0.5) * -20;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="bg-gradient-cosmic text-white py-20 relative overflow-hidden animate-gradient-shift">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="text-sm text-mars-200 flex items-center gap-2">
              <span className="text-2xl animate-orbit">{'\u{1F549}\uFE0F'}</span>
              <span>Vedic Astrology & Cosmic Guidance</span>
            </div>

            <div className="space-y-3">
              <div className="text-4xl text-cosmic-gold animate-orbit">{'\u{1F549}\uFE0F'}</div>
              <h1 className="text-5xl md:text-6xl font-display font-bold">
                <span className="text-mars-300">AstrobyAb</span>
                <span className="text-5xl md:text-6xl ml-4">{'\u{1F549}\uFE0F'}</span>
              </h1>
            </div>

            <p className="text-xl text-mars-200 italic font-serif">
              {"\u092F\u0925\u093E \u092A\u093F\u0923\u094D\u0921\u0947 \u0924\u0925\u093E \u092C\u094D\u0930\u0939\u094D\u092E\u093E\u0923\u094D\u0921\u0947"}
            </p>

            <p className="text-lg text-mars-100 leading-relaxed">
              As is the microcosm, so is the macrocosm
            </p>

            <div className="flex gap-4 pt-4 flex-wrap">
              <AuthAction
                href="/signup"
                className="bg-gradient-mars text-white px-8 py-3 rounded font-semibold hover:opacity-90 transition-opacity hover-glow"
                dialogTitle="Create an account to continue"
                dialogDescription="Sign up or sign in to begin your journey."
              >
                Begin Your Journey &rarr;
              </AuthAction>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded text-foreground bg-white/95 border border-white/60 shadow-cosmic flex-1 min-w-[220px] placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cosmic-gold"
              />
            </div>
          </div>

          {/* Right - Zodiac Orb */}
          <div className="flex justify-center md:justify-end relative">
            <div className="absolute -top-8 -left-6 text-3xl text-mars-200/70 animate-orbit">{'\u{1F549}\uFE0F'}</div>
            <div className="absolute -bottom-6 right-10 text-2xl text-cosmic-gold/80 animate-orbit">{'\u{1F549}\uFE0F'}</div>
            <div
              className="w-80 h-80 flex items-center justify-center animate-float"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="text-[11rem] leading-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] animate-shell"
                style={{
                  transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 120ms ease-out',
                }}
              >
                {'\u{1F41A}'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Icon - Bottom Right */}
      <Link
        href="/contact"
        className="absolute bottom-6 right-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:shadow-cosmic transition-all shadow-cosmic"
        aria-label="Contact us"
      >
        <span className="text-white text-xl animate-cosmic-pulse">{'\u{1F4AC}'}</span>
      </Link>
    </section>
  );
}
