'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Service {
  id: string;
  name: string;
  slug?: string | null;
  price: number;
  description?: string;
  icon?: string;
}

const fallbackServices = [
  {
    icon: '\u{1FA90}',
    title: 'Janam Kundli Analysis',
    description: 'Comprehensive birth chart analysis revealing your life path, strengths, and cosmic blueprint.',
    href: '/services/janam-kundli',
  },
  {
    icon: '\u{1F4BC}',
    title: 'Career & Education Guidance',
    description: 'Astrological insights to guide your professional journey and educational choices.',
    href: '/services/career-guidance',
  },
  {
    icon: '\u{1F491}',
    title: 'Marriage & Relationship Matching',
    description: 'Kundli matching for compatibility assessment and relationship harmony.',
    href: '/services/marriage-matching',
  },
  {
    icon: '\u{1FA7A}',
    title: 'Health & Wealth Astrology',
    description: 'Planetary insights for physical wellbeing and financial prosperity.',
    href: '/services/health-wealth',
  },
  {
    icon: '\u{1F48E}',
    title: 'Gemstone Remedies',
    description: 'Personalized gemstone recommendations based on your planetary positions.',
    href: '/services/gemstone-remedies',
  },
  {
    icon: '\u{1F4FF}',
    title: 'Mantra & Spiritual Remedies',
    description: 'Sacred mantras and rituals to harmonize planetary energies.',
    href: '/services/mantra-remedies',
  },
  {
    icon: '\u{1F30C}',
    title: 'Complete Astrology Analysis',
    description: 'Our most comprehensive package combining all services.',
    href: '/services/complete-astrology',
  },
];

const knownServiceLinks: Record<string, string> = {
  'Janam Kundli Analysis': '/services/janam-kundli',
  'Janam Kundli': '/services/janam-kundli',
  'Career & Education Guidance': '/services/career-guidance',
  'Career Guidance': '/services/career-guidance',
  'Marriage & Relationship Matching': '/services/marriage-matching',
  'Marriage Matching': '/services/marriage-matching',
  'Health & Wealth Astrology': '/services/health-wealth',
  'Health & Wealth': '/services/health-wealth',
  'Gemstone Remedies': '/services/gemstone-remedies',
  'Mantra & Spiritual Remedies': '/services/mantra-remedies',
  'Mantra Remedies': '/services/mantra-remedies',
  'Complete Astrology Analysis': '/services/complete-astrology',
};

const normalizeSlug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          setServices(data.services || []);
        }
      } catch (error) {
        console.error('[v0] Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);

  const list = services.length
    ? services.map((service) => ({
        icon: service.icon || '\u{2728}',
        title: service.name,
        description: service.description || 'Personalized astrological guidance.',
        href:
          knownServiceLinks[service.name] ||
          (service.slug ? `/services/${service.slug}` : `/services/${normalizeSlug(service.name)}`),
      }))
    : fallbackServices;

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
          {list.map((service, idx) => (
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
      <Link
        href="/contact"
        className="fixed bottom-6 right-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:shadow-cosmic transition-all shadow-cosmic"
        aria-label="Contact us"
      >
        <span className="text-white text-xl animate-cosmic-pulse">{'\u{1F4AC}'}</span>
      </Link>
    </section>
  );
}
