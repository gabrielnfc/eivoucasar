// ===============================================
// EICASEI - STRIPE CLIENT CONFIGURATION
// ===============================================

import Stripe from 'stripe'

// Safe environment variable access
const getStripeEnv = () => {
  return {
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder',
  }
}

const env = getStripeEnv()

// Server-side Stripe instance
export const stripe = new Stripe(env.secretKey, {
  apiVersion: '2025-05-28.basil',
  appInfo: {
    name: 'EiVouCasar!',
    version: '1.0.0',
  },
})

// Export environment variables
export const stripePublishableKey = env.publishableKey
export const stripeWebhookSecret = env.webhookSecret

// Runtime validation
export function validateStripeKeys() {
  if (!stripePublishableKey.startsWith('pk_')) {
    throw new Error('Invalid Stripe publishable key')
  }
  
  if (!env.secretKey.startsWith('sk_')) {
    throw new Error('Invalid Stripe secret key')
  }
  
  if (!stripeWebhookSecret.startsWith('whsec_')) {
    throw new Error('Invalid Stripe webhook secret')
  }
}

// Log validation status (only in development)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  try {
    if (env.secretKey !== 'sk_test_placeholder') {
      validateStripeKeys()
      console.log('✅ Stripe configuration validated')
    } else {
      console.warn('⚠️ Using placeholder Stripe keys')
    }
  } catch (error) {
    console.error('❌ Stripe configuration error:', error)
  }
} 