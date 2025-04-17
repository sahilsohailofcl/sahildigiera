"use client";
import { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const categories = [
  "Technology",
  "Design",
  "Development",
  "Business",
  "Marketing",
  "Tutorial",
];

interface BlogPost {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  image?: string;
  category: string;
  status: string;
}

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogPost>({
    id: 0,
    title: "",
    description: "",
    author: "",
    date: new Date().toISOString(),
    image: "",
    category: "Uncategorized",
    status: "draft",
  });

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/blogs/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch blog post");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBlogPost();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog post");
      }

      router.push("/admin/dashboard/blogs");
    } catch (error) {
      console.error("Error updating blog post:", error);
      setError(error instanceof Error ? error.message : "Failed to update blog post");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/admin/dashboard/blogs"
          className="inline-flex items-center text-white/60 hover:text-white"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Blogs
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-white">Edit Blog Post</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white/60"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-white/60"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white/60"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={15}
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-white/60"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-white/60"
            >
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={formData.image || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/dashboard/blogs"
              className="px-4 py-2 border border-white/10 rounded-md text-white/60 hover:bg-white/5"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-[#50a826] text-white rounded-md hover:bg-[#317e31]"
            >
              Update Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 