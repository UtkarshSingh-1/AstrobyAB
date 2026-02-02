import Header from '@/components/header';
import Hero from '@/components/hero';
import MantraSection from '@/components/mantra-section';
import Services from '@/components/services';
import WhyChoose from '@/components/why-choose';
import BlessingSection from '@/components/blessing-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <MantraSection />
      <Services />
      <WhyChoose />
      <BlessingSection />
      <Footer />
    </>
  );
}
