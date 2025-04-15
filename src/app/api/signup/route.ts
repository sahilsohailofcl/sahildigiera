// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { stripe } from '../../../../lib/stripe/client';

export async function POST(request: Request) {
  const { name, email, company, password, plan } = await request.json();

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists. Please login instead.' },
        { status: 400 }
      );
    }

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
      }
    });

    // Create customer in Stripe
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

    return NextResponse.json({ 
      success: true, 
      userId: user.id,
      message: 'Account created successfully'
    });
  } catch (err: unknown) {
    console.error('Signup error:', err);
    
    let errorMessage = 'Failed to create account';
    let statusCode = 500;

    if (err instanceof Error) {
      // Handle unique constraint violation (duplicate email)
      if ('code' in err && err.code === 'P2002') {
        errorMessage = 'Email already exists. Please login instead.';
        statusCode = 400;
      } else {
        errorMessage = err.message;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}