"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    author: "Sahil DigiEra",
    image: null,
  });

  // Fetch blogs from the database
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewBlog({ ...newBlog, image: file });
  };

  // Add a new blog
  const handleAddBlog = async () => {
    if (newBlog.title && newBlog.description) {
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("description", newBlog.description);
      formData.append("author", newBlog.author);
      if (newBlog.image) {
        formData.append("image", newBlog.image);
      }
  
      try {
        const response = await fetch("/api/blogs", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Failed to create blog");
        }
  
        const data = await response.json();
        setBlogs([...blogs, data]);
        setNewBlog({ title: "", description: "", author: "Sahil DigiEra", image: null });
      } catch (error) {
        console.error("Error creating blog:", error);
      }
    }
  };

  // Delete a blog
  const handleDeleteBlog = async (id: number) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left Navigation Bar */}
      <div className="w-64 p-6 bg-black/90 border-r border-white/10">
        <h2 className="text-2xl font-bold mb-8 text-[#317e31]">Admin Panel</h2>
        <nav className="space-y-4">
          <Link
            href="/admin/dashboard"
            className="block py-2 px-4 rounded-lg hover:bg-white/10 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/admin/dashboard/blogs"
            className="block py-2 px-4 rounded-lg hover:bg-white/10 transition duration-300"
          >
            Blogs
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Blog Management</h1>

        {/* Add New Blog Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
          <input
            type="text"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-[#317e31] outline-none"
          />
          <textarea
            placeholder="Blog Description"
            value={newBlog.description}
            onChange={(e) =>
              setNewBlog({ ...newBlog, description: e.target.value })
            }
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-[#317e31] outline-none"
            rows={4}
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-[#317e31] outline-none"
          />
          <button
            onClick={handleAddBlog}
            className="py-2 px-6 bg-[#317e31] hover:bg-[#2a6c2a] text-white font-semibold rounded-lg transition duration-300"
          >
            Add Blog
          </button>
        </motion.div>

        {/* Blog List */}
        <div className="space-y-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            >
              {blog.image && (
                <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold text-[#317e31] mb-2">
                {blog.title}
              </h2>
              <p className="text-white/80 mb-4">{blog.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">
                  {new Date(blog.date).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="py-1 px-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg hover:bg-red-500/20 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}