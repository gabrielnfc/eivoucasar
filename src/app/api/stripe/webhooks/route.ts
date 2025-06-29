// ===============================================
// EICASEI - STRIPE WEBHOOKS HANDLER
// ===============================================

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe, stripeWebhookSecret } from '@/lib/stripe/client'
import { prisma } from '@/lib/database/prisma'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  if (!stripeWebhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  try {
    // Get the request body as text
    const body = await request.text()
    
    // Get Stripe signature from headers (await for Next.js 15)
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      console.error('No stripe-signature header found')
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400 }
      )
    }

    // Verify webhook signature and construct event
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    console.log(`Processing webhook event: ${event.type}`)

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Handler functions
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', session.id)

  const { userId, coupleId, planId } = session.metadata || {}

  if (!userId || !planId) {
    console.error('Missing required metadata in checkout session')
    return
  }

  try {
    // Find the subscription plan
    const subscriptionPlan = await prisma.subscriptionPlan.findFirst({
      where: { 
        name: {
          equals: planId === 'BASIC' ? 'Básico' : 
                 planId === 'PREMIUM' ? 'Premium' : 'Pro',
          mode: 'insensitive'
        }
      }
    })

    if (!subscriptionPlan) {
      console.error(`Subscription plan not found: ${planId}`)
      return
    }

    // Create or update subscription record
    if (coupleId) {
      // Check if subscription already exists
      const existingSubscription = await prisma.subscription.findFirst({
        where: { coupleId }
      })

      if (existingSubscription) {
        // Update existing subscription
        await prisma.subscription.update({
          where: { id: existingSubscription.id },
          data: {
            planId: subscriptionPlan.id,
            stripeSubscriptionId: session.subscription as string,
            stripeCustomerId: session.customer as string,
            status: 'active'
          }
        })
      } else {
        // Create new subscription
        await prisma.subscription.create({
          data: {
            coupleId,
            planId: subscriptionPlan.id,
            stripeSubscriptionId: session.subscription as string,
            stripeCustomerId: session.customer as string,
            status: 'active'
          }
        })
      }
    }

    console.log(`Subscription created/updated for couple: ${coupleId}`)

  } catch (error) {
    console.error('Error handling checkout completed:', error)
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id)

  const { userId, coupleId, planId } = subscription.metadata

  if (!coupleId || !planId) {
    console.error('Missing required metadata in subscription')
    return
  }

  try {
    // Find the subscription plan
    const subscriptionPlan = await prisma.subscriptionPlan.findFirst({
      where: { 
        name: {
          equals: planId === 'BASIC' ? 'Básico' : 
                 planId === 'PREMIUM' ? 'Premium' : 'Pro',
          mode: 'insensitive'
        }
      }
    })

    if (!subscriptionPlan) {
      console.error(`Subscription plan not found: ${planId}`)
      return
    }

    // Update subscription with dates
    const existingSubscription = await prisma.subscription.findFirst({
      where: { coupleId }
    })

    if (existingSubscription) {
      // Update existing subscription
      await prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: {
          status: subscription.status
        }
      })
    } else {
      // Create new subscription
      await prisma.subscription.create({
        data: {
          coupleId,
          planId: subscriptionPlan.id,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          status: subscription.status
        }
      })
    }

    console.log(`Subscription updated with period dates for couple: ${coupleId}`)

  } catch (error) {
    console.error('Error handling subscription created:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id)

  try {
    // Update subscription in database
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: subscription.status
      }
    })

    console.log(`Subscription ${subscription.id} updated in database`)

  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id)

  try {
    // Update subscription status to canceled
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: 'canceled'
      }
    })

    console.log(`Subscription ${subscription.id} marked as canceled`)

  } catch (error) {
    console.error('Error handling subscription deleted:', error)
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Payment succeeded:', invoice.id)
  // Payment processing is handled by subscription events
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed:', invoice.id)
  // Payment processing is handled by subscription events
} 