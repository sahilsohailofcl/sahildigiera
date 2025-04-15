// app/api/trial/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface Subscription {
  status?: string;
  plan?: string;
  trialEndsAt?: string;
  trialStartedAt?: string;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      console.error('Trial error: No session found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the selected plan from the request body
    const { plan } = await req.json();
    const selectedPlan = plan || 'discovery';

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
    const subscription = user.subscription as Subscription | null;
    if (subscription?.status === 'active') {
      console.error('Trial error: User already has an active subscription');
      return NextResponse.json(
        { error: 'You already have an active subscription' },
        { status: 400 }
      );
    }

    // Check if user already has a trial
    if (user.trialEndsAt && new Date(user.trialEndsAt) > new Date()) {
      console.log('User already has an active trial, returning current trial info');
      return NextResponse.json({
        message: 'You already have an active trial',
        trial: {
          status: 'trialing',
          trialEndsAt: user.trialEndsAt,
          trialStartedAt: user.trialStartedAt,
          plan: subscription?.plan || selectedPlan
        }
      });
    }

    // Set trial end date (14 days from now)
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    // Create a basic subscription object for the trial
    const trialSubscription = {
      status: 'trialing',
      trialEndsAt: trialEndsAt.toISOString(),
      trialStartedAt: new Date().toISOString(),
      plan: selectedPlan
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

    return NextResponse.json({
      success: true,
      trial: {
        status: 'trialing',
        trialEndsAt: updatedUser.trialEndsAt,
        trialStartedAt: updatedUser.trialStartedAt,
        plan: updatedUser.subscription?.plan || selectedPlan
      }
    });
  } catch (error) {
    console.error('Trial error:', error);
    return NextResponse.json(
      { error: 'Failed to start trial' },
      { status: 500 }
    );
  }
}