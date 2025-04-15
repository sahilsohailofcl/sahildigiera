// app/api/trial/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      console.error('Trial error: No session found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Session user:', session.user);

    // Check if user already has an active subscription
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      console.error('Trial error: User not found in database');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('Found user:', { id: user.id, subscription: user.subscription });

    // Check if user already has an active subscription
    if (user.subscription && typeof user.subscription === 'object' && (user.subscription as any).status === 'active') {
      console.error('Trial error: User already has an active subscription');
      return NextResponse.json(
        { error: 'You already have an active subscription' },
        { status: 400 }
      );
    }

    // Check if user already has a trial
    if (user.trialEndsAt && new Date(user.trialEndsAt) > new Date()) {
      console.error('Trial error: User already has an active trial');
      return NextResponse.json(
        { error: 'You already have an active trial' },
        { status: 400 }
      );
    }

    // Set trial end date (14 days from now)
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    // Create a basic subscription object for the trial
    const trialSubscription = {
      status: 'trialing',
      trialEndsAt: trialEndsAt.toISOString(),
      trialStartedAt: new Date().toISOString(),
      plan: 'discovery'
    };

    console.log('Creating trial subscription:', trialSubscription);

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        trialEndsAt,
        trialStartedAt: new Date(),
        subscription: trialSubscription
      },
    });

    console.log('Updated user:', { id: updatedUser.id, subscription: updatedUser.subscription });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Trial error:', error);
    return NextResponse.json(
      { error: 'Failed to start trial' },
      { status: 500 }
    );
  }
}