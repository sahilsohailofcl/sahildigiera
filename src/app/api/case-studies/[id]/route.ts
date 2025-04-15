import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const caseStudy = await prisma.caseStudy.findUnique({
            where: { id: params.id }
        });

        if (!caseStudy) {
            return NextResponse.json({ error: "Case Study not found" }, { status: 404 });
        }

        return NextResponse.json(caseStudy);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
      const session = await getServerSession(authOptions);
      
      if (!session?.user) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const data = await req.json();
      console.log("Update data:", data);

      // Check if case study exists and belongs to the user
      const existingCaseStudy = await prisma.caseStudy.findUnique({
          where: { id: params.id }
      });

      if (!existingCaseStudy) {
          return NextResponse.json({ error: "Case Study not found" }, { status: 404 });
      }

      if (existingCaseStudy.userId !== session.user.id) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      // Format the data properly
      const formattedData = {
          ...data,
          results: Array.isArray(data.results) ? data.results : [],
          technologies: Array.isArray(data.technologies) ? data.technologies : [],
          metrics: typeof data.metrics === 'string' ? JSON.parse(data.metrics) : data.metrics,
      };

      const updatedCaseStudy = await prisma.caseStudy.update({
          where: { id: params.id },
          data: formattedData,
      });

      return NextResponse.json(updatedCaseStudy);
  } catch (error) {
      console.error("Error updating case study:", error);
      return NextResponse.json(
          { error: "Unable to update case study", details: error instanceof Error ? error.message : "Unknown error" },
          { status: 500 }
      );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
      const session = await getServerSession(authOptions);
      
      if (!session?.user) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Check if case study exists and belongs to the user
      const existingCaseStudy = await prisma.caseStudy.findUnique({
          where: { id: params.id }
      });

      if (!existingCaseStudy) {
          return NextResponse.json({ error: "Case Study not found" }, { status: 404 });
      }

      if (existingCaseStudy.userId !== session.user.id) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      await prisma.caseStudy.delete({
          where: { id: params.id },
      });

      return NextResponse.json({ message: "Case Study deleted successfully" });
  } catch (error) {
      console.error("Error deleting case study:", error);
      return NextResponse.json(
          { error: "Unable to delete case study", details: error instanceof Error ? error.message : "Unknown error" },
          { status: 500 }
      );
  }
}
