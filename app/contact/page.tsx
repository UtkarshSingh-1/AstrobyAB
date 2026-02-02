import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-cosmic text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-display font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-mars-100">We're here to help guide your cosmic journey</p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <h2 className="text-3xl font-display font-bold text-foreground">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground">contact@astrobyab.com</p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">Phone</h3>
                    <p className="text-muted-foreground">+91 XXXXXXXXXX</p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">Hours</h3>
                    <p className="text-muted-foreground">Monday - Sunday<br />Available 9:00 AM - 9:00 PM IST</p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">Response Time</h3>
                    <p className="text-muted-foreground">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gradient-warm rounded-lg p-8 space-y-6">
                <h3 className="text-2xl font-display font-bold text-foreground">Send us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                    <input type="text" className="w-full px-4 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your email" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                    <input type="text" className="w-full px-4 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Message subject" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                    <textarea className="w-full px-4 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary" rows={5} placeholder="Your message"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-gradient-mars text-white py-3 rounded font-semibold hover:opacity-90 transition-opacity">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
