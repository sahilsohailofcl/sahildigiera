// src/app/api/people/post/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    
    if (!token || token.role !== UserRole.ADMIN) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, email, company, phone } = await req.json();

    // Create a new user with CLIENT role
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: '', // You'll need to handle password creation separately
        role: UserRole.CLIENT,
        company,
        phone,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error('Error creating client:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
