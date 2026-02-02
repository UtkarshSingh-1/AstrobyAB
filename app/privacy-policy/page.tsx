import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="bg-gradient-cosmic text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-display font-bold">Privacy Policy</h1>
            <p className="text-mars-200 mt-4">Last Updated: January 2025</p>
          </div>
        </section>

        <section className="bg-background py-20">
          <div className="container mx-auto px-4 max-w-4xl space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At ASTRO BY AB, we are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy outlines how we collect, use, maintain, and disclose information collected from our users.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-foreground">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">We may collect information about you in a variety of ways:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Date, time and place of birth for astrological analysis</li>
                <li>Payment information for consultation bookings</li>
                <li>Communication history and feedback</li>
                <li>Technical data about your device and browsing activity</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-foreground">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">We use the information we collect for:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Providing astrological consultations and services</li>
                <li>Processing payments for services</li>
                <li>Improving our website and services</li>
                <li>Communicating with you about your consultations</li>
                <li>Complying with legal and regulatory requirements</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-foreground">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All sensitive data is encrypted during transmission.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-foreground">5. Cookie Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website uses cookies to enhance your experience. You can choose to disable cookies through your browser settings, but this may affect your ability to access certain features of our site.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-foreground">6. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may share your information with trusted third-party service providers such as payment processors and email service providers. These providers are obligated to maintain the confidentiality of your information.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-foreground">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of communications</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-foreground">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-card p-6 rounded-lg border border-border">
                <p className="text-muted-foreground">Email: privacy@astrobyab.com</p>
                <p className="text-muted-foreground">Phone: +91 XXXXXXXXXX</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
