import AuthAction from '@/components/auth-action';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function CareerGuidancePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-cosmic text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="text-sm text-mars-200 mb-4">📖 Our Services</div>
              <h1 className="text-5xl font-display font-bold mb-6">Career & Education Guidance</h1>
              <p className="text-xl text-mars-100 font-serif leading-relaxed mb-8">
                Navigate your professional path with astrological insights. Discover your ideal career, optimal timings for major decisions, and unlock your true potential.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-mars-200">Consultation Price</p>
                  <p className="text-3xl font-bold text-cosmic-gold">₹501</p>
                </div>
                <AuthAction
                href="/book-consultation?service=career-guidance"
                className="bg-gradient-mars text-white px-8 py-3 rounded font-semibold hover:opacity-90 inline-block"
                dialogTitle="Sign up to book a consultation"
                dialogDescription="Create an account or sign in to book your consultation."
              >

                  Get Career Insights
                
              </AuthAction>
              </div>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-foreground">Career Astrology</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your birth chart reveals your natural talents, suitable career paths, and optimal timings for professional growth. Make informed career decisions with cosmic guidance.
                </p>
                <h3 className="text-2xl font-display font-bold text-foreground">Guidance Includes</h3>
                <ul className="space-y-3">
                  {['Ideal career paths', 'Educational recommendations', 'Best time for job changes', 'Professional growth periods', 'Business prospects', 'Skill development areas'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-warm rounded-lg p-8 space-y-6">
                <h3 className="text-2xl font-display font-bold text-foreground">For Whom?</h3>
                <p className="text-muted-foreground">This service is ideal for:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Students choosing their career path</li>
                  <li>• Professionals seeking change</li>
                  <li>• Entrepreneurs starting ventures</li>
                  <li>• Anyone facing career dilemmas</li>
                </ul>
                <AuthAction
                href="/book-consultation?service=career-guidance"
                className="block w-full bg-gradient-mars text-white px-6 py-3 rounded font-semibold hover:opacity-90 text-center"
                dialogTitle="Sign up to book a consultation"
                dialogDescription="Create an account or sign in to book your consultation."
              >

                  Consult Now
                
              </AuthAction>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
