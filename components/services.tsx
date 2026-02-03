'use client';

import Link from 'next/link';

export default function Services() {
  const services = [
    {
      icon: '☀️',
      title: 'Janam Kundli Analysis',
      description: 'Comprehensive birth chart analysis revealing your life path, strengths, and cosmic blueprint.',
      href: '/services/janam-kundli',
    },
    {
      icon: '📖',
      title: 'Career & Education Guidance',
      description: 'Astrological insights to guide your professional journey and educational choices.',
      href: '/services/career-guidance',
    },
    {
      icon: '❤️',
      title: 'Marriage & Relationship Matching',
      description: 'Kundli matching for compatibility assessment and relationship harmony.',
      href: '/services/marriage-matching',
    },
    {
      icon: '⭐',
      title: 'Health & Wealth Astrology',
      description: 'Planetary insights for physical wellbeing and financial prosperity.',
      href: '/services/health-wealth',
    },
    {
      icon: '💎',
      title: 'Gemstone Remedies',
      description: 'Personalized gemstone recommendations based on your planetary positions.',
      href: '/services/gemstone-remedies',
    },
    {
      icon: '🌙',
      title: 'Mantra & Spiritual Remedies',
      description: 'Sacred mantras and rituals to harmonize planetary energies.',
      href: '/services/mantra-remedies',
    },
    {
      icon: '⭐',
      title: 'Complete Astrology Analysis',
      description: 'Our most comprehensive package combining all services. Price: ₹21,001',
      href: '/services/complete-astrology',
    },
  ];

  return (
    <section id="services" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-display font-bold">
            Our <span className="text-gradient-mars">ASTROLOGICAL SERVICES</span>
          </h2>
          <p className="text-muted-foreground text-lg font-serif">
            Discover the cosmic wisdom that guides your path through life&apos;s journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Link key={idx} href={service.href} className="group">
              <div className="border-cosmic rounded-lg p-6 hover:shadow-cosmic transition-all hover:scale-105 bg-white/50 backdrop-blur-sm h-full hover-glow">
                <div className="text-3xl mb-4 bg-gradient-mars text-white w-14 h-14 rounded flex items-center justify-center animate-cosmic-pulse">
                  {service.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Chat Icon */}
      <div className="fixed bottom-6 right-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:shadow-cosmic transition-all shadow-cosmic">
        <span className="text-white text-xl animate-cosmic-pulse">💬</span>
      </div>
    </section>
  );
}
