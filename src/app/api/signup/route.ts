// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { stripe } from '../../../../lib/stripe/client';

export async function POST(request: Request) {
  const { name, email, company, password, plan } = await request.json();

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        company,
        role: "CLIENT",
        trialEndsAt: plan === 'trial' 
          ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) 
          : null
      }
    });

    // Create customer in Stripe if not trial
    if (plan !== 'trial') {
      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          company,
          userId: user.id
        }
      });

      // Update user with stripeCustomerId
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customer.id }
      });
    }

    return NextResponse.json({ success: true, userId: user.id });
  } catch (err: unknown) {
    console.error('Signup error:', err);
    
    let errorMessage = 'Failed to create account';
    if (err instanceof Error) {
      // Handle unique constraint violation (duplicate email)
      if ('code' in err && err.code === 'P2002') {
        errorMessage = 'Email already exists';
      } else {
        errorMessage = err.message;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}