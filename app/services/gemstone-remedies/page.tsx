import AuthAction from '@/components/auth-action';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function GemstoneRemediePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-cosmic text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="text-sm text-mars-200 mb-4">💎 Our Services</div>
              <h1 className="text-5xl font-display font-bold mb-6">Gemstone Remedies</h1>
              <p className="text-xl text-mars-100 font-serif leading-relaxed mb-8">
                Harness the power of precious gemstones to strengthen planetary positions. Personalized recommendations based on your unique birth chart.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-mars-200">Consultation Price</p>
                  <p className="text-3xl font-bold text-cosmic-gold">₹501</p>
                </div>
                <AuthAction
                href="/book-consultation?service=gemstone-remedies"
                className="bg-gradient-mars text-white px-8 py-3 rounded font-semibold hover:opacity-90 inline-block"
                dialogTitle="Sign up to book a consultation"
                dialogDescription="Create an account or sign in to book your consultation."
              >

                  Get Recommendations
                
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
                <h2 className="text-3xl font-display font-bold text-foreground">Power of Gemstones</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Gemstones have been used for centuries to enhance positive planetary influences and mitigate negative effects. Each gemstone vibrates with specific planetary energies.
                </p>
                <h3 className="text-2xl font-display font-bold text-foreground">Our Process</h3>
                <ul className="space-y-3">
                  {['Birth chart analysis', 'Planetary strength assessment', 'Gemstone selection', 'Quality verification', 'Wearing guidelines', 'Expected benefits'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-warm rounded-lg p-8 space-y-6">
                <h3 className="text-2xl font-display font-bold text-foreground">Popular Gemstones</h3>
                <p className="text-muted-foreground">Common planetary gems:</p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Ruby (Sun) - Leadership & Vitality</li>
                  <li>• Pearl (Moon) - Peace & Emotions</li>
                  <li>• Emerald (Mercury) - Communication</li>
                  <li>• Diamond (Venus) - Love & Beauty</li>
                  <li>• Blue Sapphire (Saturn) - Discipline</li>
                  <li>• Coral (Mars) - Energy & Courage</li>
                </ul>
                <AuthAction
                href="/book-consultation?service=gemstone-remedies"
                className="block w-full bg-gradient-mars text-white px-6 py-3 rounded font-semibold hover:opacity-90 text-center"
                dialogTitle="Sign up to book a consultation"
                dialogDescription="Create an account or sign in to book your consultation."
              >

                  Find Your Gems
                
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
