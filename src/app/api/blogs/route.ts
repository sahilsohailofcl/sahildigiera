import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadToCloudinary } from "../../../../utils/cloudinary";

const prisma = new PrismaClient();

// POST: Create a new blog
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const author = formData.get("author") as string;
    const imageFile = formData.get("image") as File | null;

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile); // Upload the file to Cloudinary
    }

    const newBlog = await prisma.blog.create({
      data: { title, description, author, image: imageUrl },
    });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

// GET: Fetch all blogs
export async function GET() {
    try {
      const blogs = await prisma.blog.findMany();
      return NextResponse.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return NextResponse.json(
        { error: "Failed to fetch blogs" },
        { status: 500 }
      );
    }
  }