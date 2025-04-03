import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

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
      const data = await req.json();

      const updatedCaseStudy = await prisma.caseStudy.update({
          where: { id: params.id },
          data,
      });

      return NextResponse.json(updatedCaseStudy);
  } catch (error) {
      return NextResponse.json({ error: "Unable to update case study" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
      await prisma.caseStudy.delete({
          where: { id: params.id },
      });

      return NextResponse.json({ message: "Case Study deleted successfully" });
  } catch (error) {
      return NextResponse.json({ error: "Unable to delete case study" }, { status: 500 });
  }
}
