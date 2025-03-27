// src/app/api/people/post/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Remove any existing validation that might prevent duplicate submissions
    const newClient = await prisma.client.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create client:", error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      // This is the unique constraint error code
      return NextResponse.json(
        { error: "Thank you for contacting us again! We've received your message." },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to process your message. Please try again later." },
      { status: 500 }
    );
  }
}