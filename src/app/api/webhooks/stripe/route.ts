import { NextResponse } from 'next/server';
import { stripe } from '../../../../../lib/stripe/client';
import { prisma } from '../../../../../lib/prisma';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    // Type guard to check if it's an Error
    if (err instanceof Error) {
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }
    return new NextResponse(`Webhook Error: Unknown error occurred`, { status: 400 });
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscription: {
              status: 'active',
              customerId: session.customer,
              subscriptionId: session.subscription,
            }
          }
        });
      }
      break;
    }
    
    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      const customerId = subscription.customer;
      
      const user = await prisma.user.findFirst({
        where: { stripeCustomerId: customerId }
      });
      
      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscription: {
              status: subscription.status,
              customerId: subscription.customer,
              subscriptionId: subscription.id,
            }
          }
        });
      }
      break;
    }
    
    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      const customerId = subscription.customer;
      
      const user = await prisma.user.findFirst({
        where: { stripeCustomerId: customerId }
      });
      
      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscription: null
          }
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}