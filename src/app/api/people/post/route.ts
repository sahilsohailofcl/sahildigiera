import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    console.log("Creating person with data:", { name, email, message });
    const person = await prisma.person.create({
      data: {
        name,
        email,
        message,
      },
    });
    console.log("Created person:", person);

    return NextResponse.json(person);
  } catch (err) {
    const error = err as Error; // Type assertion
    console.error('Failed to create person:', error.message);
    return NextResponse.json(
      { error: 'Failed to create person', details: error.message },
      { status: 500 }
    );
  }
}