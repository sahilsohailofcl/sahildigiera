import { NextResponse } from 'next/server';
import { stripe } from '../../../../lib/stripe/client';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
<<<<<<< HEAD
=======

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  
  if (!token?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { priceId } = await req.json();
>>>>>>> b340d51e6ab5dacdae3b8772f23743a3ab801c2c

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    
    if (!token?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { priceId, billingPeriod } = await req.json();

    if (!priceId) {
      return new NextResponse('Price ID is required', { status: 400 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      customer: token.stripeCustomerId as string,
      metadata: {
        userId: token.id,
      },
    });

    return NextResponse.json({ id: checkoutSession.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
