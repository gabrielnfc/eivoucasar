'use client';

import { useAuth } from '@/contexts/auth-context';
import {
  Navigation,
  HeroSection,
  SocialProofSection,
  FeaturesSection,
  ExamplesSection,
  GamificationSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer,
} from '@/components/landing';

export default function LandingPage() {
  // Landing page não deve forçar verificação de auth
  // Apenas verificar se usuário já está logado (passivo)
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <ExamplesSection />
      <GamificationSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
