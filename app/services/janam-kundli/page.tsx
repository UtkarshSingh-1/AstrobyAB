import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function JanamKundliPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-cosmic text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="text-sm text-mars-200 mb-4">☀️ Our Services</div>
              <h1 className="text-5xl font-display font-bold mb-6">Janam Kundli Analysis</h1>
              <p className="text-xl text-mars-100 font-serif leading-relaxed mb-8">
                Unlock the cosmic blueprint of your life with a comprehensive Janam Kundli analysis. Discover your strengths, challenges, and life's true purpose through ancient Vedic astrology.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-mars-200">Consultation Price</p>
                  <p className="text-3xl font-bold text-cosmic-gold">₹501</p>
                </div>
                <Link href="/book-consultation?service=janam-kundli" className="bg-gradient-mars text-white px-8 py-3 rounded font-semibold hover:opacity-90 inline-block">
                  Book Your Analysis
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-foreground">What is Janam Kundli?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your Janam Kundli, or birth chart, is a map of the celestial bodies at the exact moment you were born. It reveals your personality traits, career potential, relationship compatibility, and life challenges.
                </p>
                <h3 className="text-2xl font-display font-bold text-foreground">What You'll Discover</h3>
                <ul className="space-y-3">
                  {['Planetary positions at birth', 'Life purpose and destiny', 'Strengths and weaknesses', 'Career recommendations', 'Relationship insights', 'Auspicious timings'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-warm rounded-lg p-8 space-y-6">
                <h3 className="text-2xl font-display font-bold text-foreground">Required Information</h3>
                <p className="text-muted-foreground">To create your accurate Janam Kundli, please provide:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Date of birth (DD/MM/YYYY)</li>
                  <li>• Time of birth (HH:MM AM/PM)</li>
                  <li>• City/Place of birth</li>
                </ul>
                <Link href="/signup" className="block w-full bg-gradient-mars text-white px-6 py-3 rounded font-semibold hover:opacity-90 text-center">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
