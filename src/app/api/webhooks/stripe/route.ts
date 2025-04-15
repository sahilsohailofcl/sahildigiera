import { stripe } from '@/lib/stripe/client';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return new NextResponse('No signature', { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook error:', err);
    return new NextResponse('Webhook error', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        await prisma.user.update({
          where: { stripeCustomerId: subscription.customer as string },
          data: {
            subscription: {
              status: subscription.status,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
              plan: subscription.items.data[0].price.id,
            },
          },
        });
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        await prisma.user.update({
          where: { stripeCustomerId: deletedSubscription.customer as string },
          data: {
            subscription: null,
          },
        });
        break;
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new NextResponse('Webhook processing error', { status: 500 });
  }
}
