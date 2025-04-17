import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Handler for POST requests (creating a new case study)
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
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
        } = body;

        if (!title || !description) {
            return NextResponse.json({ message: "Title and description are required" }, { status: 400 });
        }

        // Format the data properly
        const formattedData = {
            title,
            description,
            category: category || null,
            results: Array.isArray(results) ? results : [],
            challenge: challenge || null,
            solution: solution || null,
            technologies: Array.isArray(technologies) ? technologies : [],
            coverImage: coverImage || null,
            metrics: typeof metrics === 'string' ? JSON.parse(metrics) : metrics,
            userId: session.user.id,
        };

        const caseStudy = await prisma.caseStudy.create({
            data: formattedData,
        });

        return NextResponse.json(caseStudy, { status: 201 });
    } catch (error) {
        console.error("Error creating case study:", error);
        return NextResponse.json(
            { error: "Failed to create case study" },
            { status: 500 }
        );
    }
}

// Handler for GET requests (fetching all case studies)
export async function GET() {
    try {
        const caseStudies = await prisma.caseStudy.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(caseStudies);
    } catch (error) {
        console.error('Error fetching case studies:', error);
        return NextResponse.json(
            { error: 'Failed to fetch case studies' },
            { status: 500 }
        );
    }
}
