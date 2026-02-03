import AuthAction from '@/components/auth-action';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function HealthWealthPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-cosmic text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="text-sm text-mars-200 mb-4">⭐ Our Services</div>
              <h1 className="text-5xl font-display font-bold mb-6">Health & Wealth Astrology</h1>
              <p className="text-xl text-mars-100 font-serif leading-relaxed mb-8">
                Achieve wellness and prosperity through astrological insights. Understand your health patterns and financial prospects based on planetary influences.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-mars-200">Consultation Price</p>
                  <p className="text-3xl font-bold text-cosmic-gold">₹501</p>
                </div>
                <AuthAction
                href="/book-consultation?service=health-wealth"
                className="bg-gradient-mars text-white px-8 py-3 rounded font-semibold hover:opacity-90 inline-block"
                dialogTitle="Sign up to book a consultation"
                dialogDescription="Create an account or sign in to book your consultation."
              >

                  Get Insights
                
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
                <h2 className="text-3xl font-display font-bold text-foreground">Health & Prosperity Guide</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Planetary positions influence your physical health and financial circumstances. Our analysis reveals vulnerable health periods and prosperous financial timings.
                </p>
                <h3 className="text-2xl font-display font-bold text-foreground">Health Analysis</h3>
                <ul className="space-y-3">
                  {['Health vulnerability periods', 'Wellness recommendations', 'Preventive measures', 'Beneficial activities', 'Dietary guidance', 'Exercise timing'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-warm rounded-lg p-8 space-y-6">
                <h3 className="text-2xl font-display font-bold text-foreground">Wealth Analysis</h3>
                <p className="text-muted-foreground">Understand your financial prospects:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Wealth indicators in chart</li>
                  <li>• Prosperous periods</li>
                  <li>• Investment timing</li>
                  <li>• Business opportunities</li>
                  <li>• Financial challenges</li>
                </ul>
                <AuthAction
                href="/book-consultation?service=health-wealth"
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
