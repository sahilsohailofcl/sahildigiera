import { stripe } from '../../../../lib/stripe/client';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { priceId, billingPeriod } = await req.json();

    if (!priceId) {
      return new Response('Price ID is required', { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      customer: token.stripeCustomerId as string,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
      subscription_data: {
        trial_period_days: billingPeriod === 'annual' ? 30 : 14,
      },
    });

    return Response.json({ id: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
