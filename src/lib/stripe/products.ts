// ===============================================
// EICASEI - STRIPE PRODUCTS & PRICING
// ===============================================

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  BASIC: {
    id: 'basic',
    name: 'Básico',
    description: 'Perfeito para casamentos menores',
    priceMonthly: 2990, // R$ 29,90 in cents
    priceYearly: 29990, // R$ 299,90 in cents (discount)
    maxGuests: 50,
    maxPhotos: 20,
    allowsCustomDomain: false,
    allowsAnalytics: false,
    features: [
      'Até 50 convidados',
      'Site personalizado (.eicasei.com)',
      'RSVP + Lista de presentes',
      'Gamificação básica',
      'Email notifications',
      'Suporte por email'
    ]
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    description: 'Para casamentos médios com mais recursos',
    priceMonthly: 4990, // R$ 49,90 in cents
    priceYearly: 49990, // R$ 499,90 in cents (discount)
    maxGuests: 150,
    maxPhotos: 100,
    allowsCustomDomain: true,
    allowsAnalytics: true,
    features: [
      'Até 150 convidados',
      'Domínio customizado',
      'Gamificação avançada',
      'Analytics detalhado',
      'Galeria expandida',
      'Suporte prioritário'
    ]
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    description: 'Para casamentos grandes sem limites',
    priceMonthly: 7990, // R$ 79,90 in cents
    priceYearly: 79990, // R$ 799,90 in cents (discount)
    maxGuests: -1, // Unlimited
    maxPhotos: -1, // Unlimited
    allowsCustomDomain: true,
    allowsAnalytics: true,
    features: [
      'Convidados ilimitados',
      'Fotos ilimitadas',
      'Múltiplos domínios',
      'White-label parcial',
      'API access',
      'Suporte dedicado'
    ]
  }
} as const

export type PlanId = keyof typeof SUBSCRIPTION_PLANS

// Stripe Product IDs (will be set after creating products in Stripe)
export const STRIPE_PRODUCTS = {
  BASIC: {
    productId: process.env.STRIPE_PRODUCT_BASIC_ID || '',
    monthlyPriceId: process.env.STRIPE_PRICE_BASIC_MONTHLY_ID || '',
    yearlyPriceId: process.env.STRIPE_PRICE_BASIC_YEARLY_ID || ''
  },
  PREMIUM: {
    productId: process.env.STRIPE_PRODUCT_PREMIUM_ID || '',
    monthlyPriceId: process.env.STRIPE_PRICE_PREMIUM_MONTHLY_ID || '',
    yearlyPriceId: process.env.STRIPE_PRICE_PREMIUM_YEARLY_ID || ''
  },
  PRO: {
    productId: process.env.STRIPE_PRODUCT_PRO_ID || '',
    monthlyPriceId: process.env.STRIPE_PRICE_PRO_MONTHLY_ID || '',
    yearlyPriceId: process.env.STRIPE_PRICE_PRO_YEARLY_ID || ''
  }
} as const

// Helper function to get plan details
export function getPlanDetails(planId: PlanId) {
  return SUBSCRIPTION_PLANS[planId]
}

// Helper function to format price
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cents / 100)
}

// Helper function to get Stripe price ID
export function getStripePriceId(planId: PlanId, interval: 'monthly' | 'yearly'): string {
  const plan = STRIPE_PRODUCTS[planId.toUpperCase() as keyof typeof STRIPE_PRODUCTS]
  return interval === 'monthly' ? plan.monthlyPriceId : plan.yearlyPriceId
} 