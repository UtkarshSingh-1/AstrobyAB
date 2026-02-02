'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-cosmic text-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="text-sm text-mars-200 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span>Vedic Astrology & Cosmic Guidance</span>
            </div>

            <div className="space-y-3">
              <div className="text-4xl text-cosmic-gold">ॐ</div>
              <h1 className="text-5xl md:text-6xl font-display font-bold">
                ASTRO BY AB
                <span className="text-5xl md:text-6xl ml-4">ॐ</span>
              </h1>
            </div>

            <p className="text-xl text-mars-200 italic font-serif">
              "यथा पिंडे तथा ब्रह्माण्डे"
            </p>

            <p className="text-lg text-mars-100 leading-relaxed">
              As is the microcosm, so is the macrocosm
            </p>

            <div className="flex gap-4 pt-4 flex-wrap">
              <Link href="/signup" className="bg-gradient-mars text-white px-8 py-3 rounded font-semibold hover:opacity-90 transition-opacity">
                Begin Your Journey →
              </Link>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded text-foreground bg-white/90 flex-1 min-w-[200px] placeholder-muted-foreground placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-cosmic-gold"
              />
            </div>
          </div>

          {/* Right - Circular Image */}
          <div className="flex justify-center md:justify-end">
            <div className="w-80 h-80 bg-white/10 rounded-full shadow-cosmic flex items-center justify-center border border-white/20 animate-float backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="text-6xl">☀️</div>
                <div className="text-lg font-display font-semibold text-white">ASTRO BY AB</div>
                <div className="text-sm text-mars-200 font-serif">Personalized Cosmic Guidance</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Icon - Bottom Right */}
      <div className="absolute bottom-6 right-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:shadow-cosmic transition-all shadow-cosmic">
        <span className="text-white text-xl animate-cosmic-pulse">💬</span>
      </div>
    </section>
  );
}
