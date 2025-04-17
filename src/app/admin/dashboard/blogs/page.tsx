"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

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

export default function BlogsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete blog");
        }

        // Remove the deleted blog from the state
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog post. Please try again.");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter blogs based on search query and filters
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || blog.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(blogs.map(blog => blog.category)))];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Management</h1>
          <p className="text-white/60 mt-1">Create and manage your blog posts</p>
        </div>
        <Link
          href="/admin/dashboard/blogs/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#50a826] text-white rounded-lg hover:bg-[#317e31] transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          New Blog Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-white/60">Total Posts</h3>
            <DocumentTextIcon className="w-5 h-5 text-[#50a826]" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{blogs.length}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-white/60">Published</h3>
            <EyeIcon className="w-5 h-5 text-[#50a826]" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">
            {blogs.filter(blog => blog.status === "published").length}
          </p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-white/60">Total Views</h3>
            <ChartBarIcon className="w-5 h-5 text-[#50a826]" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">0</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#50a826]"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#50a826]"
        >
          <option value="all">All Categories</option>
          {categories.filter(cat => cat !== "all").map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#50a826]"
        >
          <option value="all">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blogs Table */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/60">Title</th>
              <th className="text-left p-4 text-white/60">Author</th>
              <th className="text-left p-4 text-white/60">Category</th>
              <th className="text-left p-4 text-white/60">Status</th>
              <th className="text-left p-4 text-white/60">Date</th>
              <th className="text-right p-4 text-white/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog.id} className="border-b border-white/10 last:border-0">
                <td className="p-4 text-white">{blog.title}</td>
                <td className="p-4 text-white/60">{blog.author}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-sm bg-blue-500/20 text-blue-500">
                    {blog.category}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    blog.status === "published" 
                      ? "bg-[#317e31]/20 text-[#50a826]" 
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}>
                    {blog.status}
                  </span>
                </td>
                <td className="p-4 text-white/60">{formatDate(blog.date)}</td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/dashboard/blogs/${blog.id}/edit`}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      title="Edit blog"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors"
                      title="Delete blog"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-white/60">Showing {filteredBlogs.length} of {blogs.length} blogs</p>
      </div>
    </div>
  );
}