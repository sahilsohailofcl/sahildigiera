import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '../../../../../lib/stripe/client';
import { prisma } from '../../../../../lib/prisma';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const userId = session.metadata?.userId;

    if (!userId) {
      return new NextResponse('User id is required', { status: 400 });
    }

    // Convert Stripe objects to plain objects
    const subscriptionData = {
      status: 'active',
      customerId: typeof session.customer === 'string' ? session.customer : session.customer?.id,
      subscriptionId: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
    };

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscription: subscriptionData,
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}