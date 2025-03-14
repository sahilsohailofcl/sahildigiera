// app/blogs/[id]/page.tsx
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function BlogPage({ params }: { params: { id: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg backdrop-blur-md bg-white/5 border border-white/10">
        {blog.image && (
          <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-white/80 mb-6">{blog.description}</p>
        <div className="text-sm text-white/60">
          <span>{new Date(blog.date).toLocaleDateString()}</span> | By{" "}
          <span>{blog.author}</span>
        </div>
      </div>
    </div>
  );
}