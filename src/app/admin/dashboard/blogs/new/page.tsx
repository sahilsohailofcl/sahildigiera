"use client";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
  "Technology",
  "Design",
  "Development",
  "Business",
  "Marketing",
  "Tutorial",
];

interface BlogPost {
  title: string;
  description: string;
  category: string;
  status: string;
  image?: string;
}

export default function NewBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    description: "",
    category: "Uncategorized",
    status: "draft",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }

      router.push("/admin/dashboard/blogs");
    } catch (error) {
      console.error("Error creating blog post:", error);
      setError(error instanceof Error ? error.message : "Failed to create blog post");
    } finally {
      setIsLoading(false);
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

      <h1 className="text-2xl font-bold mb-6 text-white">Create New Blog Post</h1>

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
              disabled={isLoading}
              className="px-4 py-2 bg-[#50a826] text-white rounded-md hover:bg-[#317e31] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Create Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 