import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler for POST requests (creating a new case study)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received Body:", body); // Debugging log

        const {
            title,
            description,
            category,
            results,
            challenge,
            solution,
            technologies,
            coverImage,
            metrics,
            userId
        } = body;

        // Ensure userId is valid
        if (!userId || isNaN(userId)) {
            return NextResponse.json({ message: "Valid userId is required" }, { status: 400 });
        }

        if (!title || !description) {
            return NextResponse.json({ message: "Title and description are required" }, { status: 400 });
        }

        const caseStudy = await prisma.caseStudy.create({
            data: {
                title,
                description,
                category: category || null,
                results: Array.isArray(results) ? results : [], // Ensure array format
                challenge: challenge || null,
                solution: solution || null,
                technologies: Array.isArray(technologies) ? technologies : [], // Ensure array format
                coverImage: coverImage || null,
                metrics: metrics || null,
                userId: Number(userId), // Ensure userId is always a number
            },
        });

        return NextResponse.json(caseStudy, { status: 201 });
    } catch (error) {
        console.error("Error creating case study:", error);
        return NextResponse.json({ message: "Error creating case study", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

// Handler for GET requests (fetching all case studies)
export async function GET() {
    try {
        const caseStudies = await prisma.caseStudy.findMany();
        return NextResponse.json(caseStudies, { status: 200 });
    } catch (error) {
        console.error('Error fetching case studies:', error);
        return NextResponse.json(
            {
                message: 'Error fetching case studies',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
