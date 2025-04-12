import { NextResponse } from 'next/server';
import { stripe } from '../../../../lib/stripe/client';
import { getServerAuthSession } from '../../../../lib/auth';

export async function POST(req: Request) {
  // Create a mock request object for auth()
  const mockRequest = {
    headers: new Headers(),
    nextUrl: new URL(req.url || '/', process.env.NEXT_PUBLIC_SITE_URL)
  } as any;

  const session = await auth(mockRequest);
  
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { priceId } = await req.json();

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      customer: session.user.stripeCustomerId,
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ id: checkoutSession.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
