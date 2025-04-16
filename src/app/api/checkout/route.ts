import { stripe } from '@/lib/stripe/client';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    console.log('Starting checkout process...');
    
    const token = await getToken({ req });
    console.log('Token:', token ? 'Found' : 'Not found');
    
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    console.log('Request body:', body);

    const { priceId, billingPeriod } = body;

    if (!priceId) {
      console.error('Missing priceId in request');
      return new Response('Price ID is required', { status: 400 });
    }

    // For the Starter (free) plan
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID) {
      console.log('Processing starter plan...');
      
      // Update user's plan selection status
      await prisma.user.update({
        where: { id: token.sub as string },
        data: {
          hasSelectedPlan: true,
          subscription: {
            status: 'active',
            plan: 'starter',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          },
        },
      });

      return Response.json({ 
        success: true, 
        message: 'Starter plan activated successfully',
        redirectUrl: '/dashboard'
      });
    }

    // For paid plans
    console.log('Processing paid plan...');
    
    // Create or get Stripe customer
    let stripeCustomerId = token.stripeCustomerId as string;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: token.email as string,
        name: token.name as string,
        metadata: {
          userId: token.sub as string,
        },
      });
      stripeCustomerId = customer.id;

      // Update user with Stripe customer ID
      await prisma.user.update({
        where: { id: token.sub as string },
        data: { stripeCustomerId },
      });
    }

    // Create a price based on the billing period
    const price = await stripe.prices.create({
      product: priceId,
      unit_amount: priceId === process.env.NEXT_PUBLIC_STRIPE_GROWTH_PRICE_ID ? 49900 :
                  priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ? 99900 : 199900,
      currency: 'usd',
      recurring: {
        interval: billingPeriod === 'annual' ? 'year' : 'month',
      },
    });

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card', 'link'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
      subscription_data: {
        trial_period_days: 14, // Fixed 14-day trial for all plans
        metadata: {
          userId: token.sub as string,
          plan: priceId === process.env.NEXT_PUBLIC_STRIPE_GROWTH_PRICE_ID ? 'growth' :
                priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ? 'pro' : 'elite',
        },
      },
      metadata: {
        userId: token.sub as string,
        plan: priceId === process.env.NEXT_PUBLIC_STRIPE_GROWTH_PRICE_ID ? 'growth' :
              priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ? 'pro' : 'elite',
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
    });

    if (!session.url) {
      console.error('Failed to create checkout session:', session);
      throw new Error('Failed to create checkout session');
    }

    console.log('Checkout session created successfully');
    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response('Internal Server Error', { status: 500 });
  }
}
