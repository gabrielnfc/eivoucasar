// ===============================================
// EICASEI - STRIPE CHECKOUT SESSION API
// ===============================================

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe } from '@/lib/stripe/client'
import { getStripePriceId, getPlanDetails } from '@/lib/stripe/products'
import { createClient } from '@supabase/supabase-js'

// Validation schema
const checkoutSchema = z.object({
  planId: z.enum(['BASIC', 'PREMIUM', 'PRO']),
  interval: z.enum(['monthly', 'yearly']),
  userId: z.string().uuid(),
  email: z.string().email(),
  coupleId: z.string().uuid().optional()
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const { planId, interval, userId, email, coupleId } = checkoutSchema.parse(body)

    // Get plan details
    const planDetails = getPlanDetails(planId)
    const priceId = getStripePriceId(planId, interval)

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID not configured for this plan' },
        { status: 400 }
      )
    }

    // Create or get Stripe customer
    let customerId: string | undefined

    // Check if customer already exists
    const customers = await stripe.customers.list({
      email: email,
      limit: 1
    })

    if (customers.data.length > 0) {
      customerId = customers.data[0].id
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: email,
        metadata: {
          userId: userId,
          coupleId: coupleId || ''
        }
      })
      customerId = customer.id
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/pricing?canceled=true`,
      metadata: {
        userId: userId,
        coupleId: coupleId || '',
        planId: planId,
        interval: interval
      },
      subscription_data: {
        metadata: {
          userId: userId,
          coupleId: coupleId || '',
          planId: planId
        }
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required'
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    })

  } catch (error) {
    console.error('Stripe checkout error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET method to retrieve checkout session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer']
    })

    return NextResponse.json({
      session: {
        id: session.id,
        payment_status: session.payment_status,
        subscription_id: session.subscription,
        customer_id: session.customer,
        metadata: session.metadata
      }
    })

  } catch (error) {
    console.error('Stripe session retrieval error:', error)
    
    return NextResponse.json(
      { error: 'Session not found' },
      { status: 404 }
    )
  }
} 