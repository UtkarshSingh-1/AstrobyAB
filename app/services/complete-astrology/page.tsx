import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function CompleteAstrologyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-gradient-cosmic text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="text-sm text-mars-200 mb-4">⭐ Premium Service</div>
              <h1 className="text-5xl font-display font-bold mb-6">Complete Astrology Analysis</h1>
              <p className="text-xl text-mars-100 font-serif leading-relaxed mb-8">
                Experience our most comprehensive astrological service that combines all our expertise into one powerful consultation package.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-mars-200">Consultation Price</p>
                  <p className="text-4xl font-bold text-cosmic-gold">₹21,001</p>
                </div>
                <Link href="/book-consultation?service=complete-astrology" className="bg-gradient-mars text-white px-8 py-3 rounded font-semibold hover:opacity-90 inline-block">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-foreground">What's Included</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Complete Astrology Analysis package includes all our premium services in one comprehensive consultation:
                </p>
                <ul className="space-y-3">
                  {[
                    'Detailed Janam Kundli (Birth Chart) Analysis',
                    'Career & Education Path Guidance',
                    'Marriage & Relationship Compatibility Assessment',
                    'Health & Wealth Predictions',
                    'Personalized Gemstone Recommendations',
                    'Sacred Mantras & Spiritual Remedies',
                    'Life Path & Destiny Reading',
                    'Auspicious Timings for Important Events'
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-warm rounded-lg p-8 space-y-6">
                <h3 className="text-2xl font-display font-bold text-foreground">Why Choose Complete Package</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Best Value</p>
                    <p className="text-sm text-muted-foreground">Save significantly compared to individual consultations</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Holistic Approach</p>
                    <p className="text-sm text-muted-foreground">Get a complete picture of your life and destiny</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Lifetime Benefits</p>
                    <p className="text-sm text-muted-foreground">Personalized remedies and guidance for life</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Expert Consultation</p>
                    <p className="text-sm text-muted-foreground">Direct guidance from experienced Vedic astrologers</p>
                  </div>
                </div>
                <Link href="/signup" className="block w-full bg-gradient-mars text-white px-6 py-3 rounded font-semibold hover:opacity-90 text-center">
                  Book Your Complete Analysis - ₹21,001
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-warm py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Book', desc: 'Schedule your consultation' },
                { step: '2', title: 'Prepare', desc: 'Share your birth details' },
                { step: '3', title: 'Analyze', desc: 'Expert analysis begins' },
                { step: '4', title: 'Receive', desc: 'Get detailed guidance' }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-gradient-mars text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
