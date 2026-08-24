import { ConversionStats } from '@/components/ConversionStats';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { LandingRoot } from '@/components/LandingRoot';
import { PlatformMarquee } from '@/components/PlatformMarquee';
import { Pricing } from '@/components/Pricing';
import { StatsBand } from '@/components/StatsBand';
import { Testimonials } from '@/components/Testimonials';
import { ThreeSteps } from '@/components/ThreeSteps';
import { WordmarkMarquee } from '@/components/WordmarkMarquee';

/**
 * One scrolling page, twelve sections, in design order. All navigation is
 * in-page anchor scrolling — there are no routes.
 */
export default function Page() {
  return (
    <LandingRoot>
      <Header />
      <Hero />
      <StatsBand />
      <ConversionStats />
      <WordmarkMarquee />
      <ThreeSteps />
      <PlatformMarquee />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </LandingRoot>
  );
}
