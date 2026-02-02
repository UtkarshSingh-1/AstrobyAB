import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-cosmic text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-display font-bold mb-4">About Astro by AB</h1>
            <p className="text-xl text-mars-100 max-w-2xl">Your trusted guide in the cosmic journey of life</p>
          </div>
        </section>

        {/* Story */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-display font-bold text-foreground">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Astro by AB was founded with a singular mission: to bring authentic Vedic astrology wisdom to everyone seeking guidance and clarity in life. With over 20 years of dedicated practice and study, we blend traditional knowledge with modern understanding.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our founder, AB, trained under renowned astrologers and carries the responsibility of upholding the integrity of this ancient science. Every consultation is done with utmost care, confidentiality, and genuine intent to help.
                </p>
              </div>
              <div className="bg-gradient-warm rounded-lg p-8 space-y-4">
                <h3 className="text-2xl font-display font-bold text-foreground">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide authentic, confidential, and wisdom-backed astrological guidance that empowers individuals to make informed decisions and navigate life with confidence.
                </p>
                <h3 className="text-2xl font-display font-bold text-foreground mt-6">Our Values</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Authenticity in practice</li>
                  <li>• Confidentiality of clients</li>
                  <li>• Integrity above all</li>
                  <li>• Compassionate guidance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="bg-gradient-warm py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-bold text-foreground mb-12">Our Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Vedic Astrology', 'KP Astrology', 'Numerology', 'Vaastu Shastra', 'Gemstone Therapy', 'Mantra Science'].map((expertise) => (
                <div key={expertise} className="bg-white/50 rounded-lg p-6 border-cosmic">
                  <h3 className="text-lg font-display font-bold text-foreground">{expertise}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Ready to Begin Your Journey?</h2>
            <Link href="/signup" className="bg-gradient-mars text-white px-8 py-3 rounded font-semibold hover:opacity-90 inline-block">
              Get Started
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
