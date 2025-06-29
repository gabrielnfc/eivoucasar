// ===============================================
// EICASEI - SUBSCRIPTION UTILITIES
// ===============================================

import { prisma } from '@/lib/database/prisma'
import { stripe } from './client'
import type { Couple, Subscription, SubscriptionPlan } from '@prisma/client'

export interface SubscriptionWithPlan extends Subscription {
  plan: SubscriptionPlan
}

export interface CoupleWithSubscription extends Couple {
  subscriptions: SubscriptionWithPlan[]
}

// Check if couple has active subscription
export async function hasActiveSubscription(coupleId: string): Promise<boolean> {
  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        coupleId,
        status: 'active'
      }
    })

    return !!subscription
  } catch (error) {
    console.error('Error checking subscription:', error)
    return false
  }
}

// Get couple's current subscription
export async function getCurrentSubscription(coupleId: string): Promise<SubscriptionWithPlan | null> {
  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        coupleId,
        status: 'active'
      },
      include: {
        plan: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return subscription
  } catch (error) {
    console.error('Error getting current subscription:', error)
    return null
  }
}

// Check if couple can perform action based on plan limits
export async function canPerformAction(
  coupleId: string,
  action: 'add_guest' | 'add_photo' | 'custom_domain' | 'analytics'
): Promise<{ allowed: boolean; reason?: string }> {
  try {
    const subscription = await getCurrentSubscription(coupleId)

    if (!subscription) {
      return { allowed: false, reason: 'No active subscription' }
    }

    const { plan } = subscription

    switch (action) {
      case 'add_guest':
        if (plan.maxGuests === -1) return { allowed: true } // Unlimited

        const guestCount = await prisma.guest.count({
          where: { coupleId }
        })

        if (guestCount >= plan.maxGuests) {
          return {
            allowed: false,
            reason: `Guest limit reached (${plan.maxGuests}). Upgrade your plan.`
          }
        }
        break

      case 'add_photo':
        if (plan.maxPhotos === -1) return { allowed: true } // Unlimited

        const photoCount = await prisma.photo.count({
          where: { coupleId }
        })

        if (photoCount >= plan.maxPhotos) {
          return {
            allowed: false,
            reason: `Photo limit reached (${plan.maxPhotos}). Upgrade your plan.`
          }
        }
        break

      case 'custom_domain':
        if (!plan.allowsCustomDomain) {
          return {
            allowed: false,
            reason: 'Custom domain not available in your plan. Upgrade to Premium or Pro.'
          }
        }
        break

      case 'analytics':
        if (!plan.allowsAnalytics) {
          return {
            allowed: false,
            reason: 'Analytics not available in your plan. Upgrade to Premium or Pro.'
          }
        }
        break
    }

    return { allowed: true }

  } catch (error) {
    console.error('Error checking action permission:', error)
    return { allowed: false, reason: 'Error checking permissions' }
  }
}

// Create customer portal session for subscription management
export async function createCustomerPortalSession(coupleId: string, returnUrl: string) {
  try {
    const subscription = await getCurrentSubscription(coupleId)

    if (!subscription || !subscription.stripeCustomerId) {
      throw new Error('No active subscription found')
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: returnUrl
    })

    return { url: portalSession.url }

  } catch (error) {
    console.error('Error creating customer portal session:', error)
    throw error
  }
}

// Get subscription status with human-readable messages
export function getSubscriptionStatus(subscription: SubscriptionWithPlan | null) {
  if (!subscription) {
    return {
      status: 'none',
      message: 'Nenhuma assinatura ativa',
      color: 'red'
    }
  }

  switch (subscription.status) {
    case 'active':
      return {
        status: 'active',
        message: 'Assinatura ativa',
        color: 'green'
      }
    case 'past_due':
      return {
        status: 'past_due',
        message: 'Pagamento em atraso',
        color: 'yellow'
      }
    case 'canceled':
      return {
        status: 'canceled',
        message: 'Assinatura cancelada',
        color: 'red'
      }
    case 'unpaid':
      return {
        status: 'unpaid',
        message: 'Pagamento pendente',
        color: 'yellow'
      }
    default:
      return {
        status: 'unknown',
        message: 'Status desconhecido',
        color: 'gray'
      }
  }
}

// Get subscription usage stats
export async function getSubscriptionUsage(coupleId: string) {
  try {
    const subscription = await getCurrentSubscription(coupleId)

    if (!subscription) {
      return null
    }

    const [guestCount, photoCount] = await Promise.all([
      prisma.guest.count({ where: { coupleId } }),
      prisma.photo.count({ where: { coupleId } })
    ])

    const { plan } = subscription

    return {
      guests: {
        used: guestCount,
        limit: plan.maxGuests,
        unlimited: plan.maxGuests === -1,
        percentage: plan.maxGuests === -1 ? 0 : Math.round((guestCount / plan.maxGuests) * 100)
      },
      photos: {
        used: photoCount,
        limit: plan.maxPhotos,
        unlimited: plan.maxPhotos === -1,
        percentage: plan.maxPhotos === -1 ? 0 : Math.round((photoCount / plan.maxPhotos) * 100)
      },
      features: {
        customDomain: plan.allowsCustomDomain,
        analytics: plan.allowsAnalytics
      }
    }

  } catch (error) {
    console.error('Error getting subscription usage:', error)
    return null
  }
} 