'use client';

import Link from 'next/link';

export default function WhyChoose() {
  const reasons = [
    'Authentic Vedic Astrology traditions',
    'Personalized and confidential consultations',
    'KP Astrology expertise',
    'Remedies backed by ancient wisdom',
    '20+ years of astrological experience',
  ];

  return (
    <section id="about" className="bg-gradient-warm py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Reasons */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-display font-bold mb-2">
                Why Choose <span className="text-gradient-mars">ASTRO BY AB?</span>
              </h2>
              <p className="text-muted-foreground font-serif leading-relaxed">
                With decades of experience in Vedic and KP Astrology, we provide authentic, confidential, and wisdom-backed guidance for all aspects of life.
              </p>
            </div>

            <div className="space-y-4">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="text-2xl text-primary">✓</div>
                  <p className="text-foreground font-semibold">{reason}</p>
                </div>
              ))}
            </div>

            <Link href="/signup" className="inline-block bg-gradient-mars text-white px-8 py-3 rounded font-semibold hover:opacity-90 transition-opacity">
              Get Started Today →
            </Link>
          </div>

          {/* Right - CTA Box */}
          <div className="bg-card border-cosmic rounded-lg p-8 shadow-cosmic space-y-6">
            <h3 className="text-2xl font-display font-bold text-gradient-mars">
              BOOK A CONSULTATION
            </h3>
            <p className="text-muted-foreground font-serif">
              Connect with our expert astrologer for personalized guidance
            </p>

            <div className="bg-gradient-warm rounded-lg p-6 text-center space-y-2">
              <p className="text-3xl font-display font-bold text-primary">FREE</p>
              <p className="text-muted-foreground font-serif">Initial Consultation</p>
            </div>

            <Link href="/signup" className="block w-full bg-gradient-mars text-white py-3 rounded font-semibold hover:opacity-90 transition-opacity text-center">
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Chat Icon */}
      <div className="fixed bottom-6 right-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:shadow-cosmic transition-all shadow-cosmic">
        <span className="text-white text-xl animate-cosmic-pulse">💬</span>
      </div>
    </section>
  );
}
