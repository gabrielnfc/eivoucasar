'use client';

import { useAuth } from '@/contexts/auth-context';

// Componentes da Landing Page - 100% Modular
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
	const { user, loading } = useAuth();

	return (
		<div className="min-h-screen bg-white">
			{/* Navigation */}
			<Navigation />

			{/* Hero Section */}
			<HeroSection />

			{/* Social Proof */}
			<SocialProofSection />

			{/* Features Grid */}
			<FeaturesSection />

			{/* Examples Showcase */}
			<ExamplesSection />

			{/* Gamification Showcase */}
			<GamificationSection />

			{/* Pricing */}
			<PricingSection />

			{/* Testimonials */}
			<TestimonialsSection />

			{/* FAQ Section */}
			<FAQSection />

			{/* CTA Final */}
			<CTASection />

			{/* Footer */}
			<Footer />
		</div>
	);
}
