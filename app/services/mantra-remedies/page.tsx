import AuthAction from '@/components/auth-action';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function MantraRemediePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-cosmic text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="text-sm text-mars-200 mb-4">🌙 Our Services</div>
              <h1 className="text-5xl font-display font-bold mb-6">Mantra & Spiritual Remedies</h1>
              <p className="text-xl text-mars-100 font-serif leading-relaxed mb-8">
                Tap into ancient wisdom through sacred mantras and spiritual practices. Harmonize planetary energies and transform your life spiritually.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-mars-200">Consultation Price</p>
                  <p className="text-3xl font-bold text-cosmic-gold">₹501</p>
                </div>
                <AuthAction
                href="/book-consultation?service=mantra-remedies"
                className="bg-gradient-mars text-white px-8 py-3 rounded font-semibold hover:opacity-90 inline-block"
                dialogTitle="Sign up to book a consultation"
                dialogDescription="Create an account or sign in to book your consultation."
              >

                  Begin Spiritual Journey
                
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
                <h2 className="text-3xl font-display font-bold text-foreground">Sacred Mantras</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mantras are powerful sound vibrations that align your consciousness with cosmic energies. Each planet has specific mantras to strengthen or balance its influence in your life.
                </p>
                <h3 className="text-2xl font-display font-bold text-foreground">What You Get</h3>
                <ul className="space-y-3">
                  {['Personalized mantras', 'Chanting guidelines', 'Optimal timings', 'Duration recommendations', 'Meditation practices', 'Ritual instructions'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-warm rounded-lg p-8 space-y-6">
                <h3 className="text-2xl font-display font-bold text-foreground">Spiritual Benefits</h3>
                <p className="text-muted-foreground">Expected outcomes:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Inner peace and calm</li>
                  <li>• Mental clarity</li>
                  <li>• Emotional balance</li>
                  <li>• Spiritual awakening</li>
                  <li>• Reduced anxiety</li>
                  <li>• Better decision-making</li>
                </ul>
                <AuthAction
                href="/book-consultation?service=mantra-remedies"
                className="block w-full bg-gradient-mars text-white px-6 py-3 rounded font-semibold hover:opacity-90 text-center"
                dialogTitle="Sign up to book a consultation"
                dialogDescription="Create an account or sign in to book your consultation."
              >

                  Get Mantras
                
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
