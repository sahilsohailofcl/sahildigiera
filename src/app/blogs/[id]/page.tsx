// app/blogs/[id]/page.tsx
import { PrismaClient } from "@prisma/client";
import { Header } from "../../sections/Header";
import { Footer } from "../../sections/Footer";
import { FiCalendar, FiUser, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { notFound } from "next/navigation";

// Simplified type based on your actual Prisma model
type Blog = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  date: Date;
  author: string;
};

const prisma = new PrismaClient();

export default async function BlogPage({ params }: { params: { id: string } }) {
  try {
    // Simplified query that matches your actual schema
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!blog) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Back button */}
          <div className="container mx-auto px-6 py-8">
            <Link 
              href="/blogs" 
              className="inline-flex items-center gap-2 text-[#50a826] hover:text-[#50a826]/80 transition-colors"
            >
              <FiArrowLeft size={18} />
              Back to all blogs
            </Link>
          </div>

          {/* Blog Content */}
          <article className="container mx-auto px-6 pb-16 max-w-4xl">
            <div className="p-8 rounded-xl shadow-2xl backdrop-blur-md bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
              {/* Blog Header */}
              <header className="mb-12">
                {blog.image && (
                  <div className="relative h-80 w-full mb-8 rounded-xl overflow-hidden group">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                )}
                
                <div className="flex items-center gap-3 text-sm text-white/60 mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#50a826]/20 text-[#50a826]">
                    <FiCalendar size={14} />
                    {blog.date.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {blog.title}
                </h1>
                
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  {blog.description}
                </p>
              </header>

              {/* Blog Content */}
              <section className="prose prose-invert max-w-none mb-12">
                <p className="text-white/80">
                  This is where your blog content would be displayed. 
                  Consider adding a 'content' field to your Prisma model if you need to store full articles.
                </p>
              </section>

              {/* Author Bio */}
              <footer className="pt-8 mt-12 border-t border-white/10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <FiUser size={24} className="text-white/60" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Written by</p>
                    <h3 className="text-xl font-medium">{blog.author}</h3>
                  </div>
                </div>
              </footer>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg backdrop-blur-md bg-red-900/10 border border-red-900/20 text-center">
            <h1 className="text-3xl font-bold mb-4 text-red-500">Error</h1>
            <p className="text-white/80 mb-6">Failed to load the blog post. Please try again later.</p>
            <Link
              href="/blogs"
              className="inline-block px-6 py-2 bg-[#50a826] hover:bg-[#50a826]/90 rounded-full text-sm font-medium transition-colors"
            >
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}