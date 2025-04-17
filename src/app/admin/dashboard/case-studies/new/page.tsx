"use client";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const categories = [
  "Design",
  "Development",
  "Marketing",
  "Business",
  "Technology",
  "Strategy",
];

export default function NewCaseStudyPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    challenge: "",
    solution: "",
    results: "",
    technologies: "",
    status: "draft",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/case-studies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create case study");
      }

      // Redirect to the case studies list page on success
      window.location.href = "/admin/dashboard/case-studies";
    } catch (error) {
      console.error("Error creating case study:", error);
      // You might want to show an error message to the user here
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
          href="/admin/dashboard/case-studies"
          className="inline-flex items-center text-white/60 hover:text-white"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Case Studies
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-white">Create New Case Study</h1>

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
              <option value="">Select a category</option>
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
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="challenge"
              className="block text-sm font-medium text-white/60"
            >
              Challenge
            </label>
            <textarea
              name="challenge"
              id="challenge"
              rows={3}
              value={formData.challenge}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="solution"
              className="block text-sm font-medium text-white/60"
            >
              Solution
            </label>
            <textarea
              name="solution"
              id="solution"
              rows={3}
              value={formData.solution}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="results"
              className="block text-sm font-medium text-white/60"
            >
              Results
            </label>
            <textarea
              name="results"
              id="results"
              rows={3}
              value={formData.results}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="technologies"
              className="block text-sm font-medium text-white/60"
            >
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              name="technologies"
              id="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
              placeholder="e.g., React, Node.js, MongoDB"
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

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/dashboard/case-studies"
              className="px-4 py-2 border border-white/10 rounded-md text-white/60 hover:bg-white/5"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-[#50a826] text-white rounded-md hover:bg-[#317e31]"
            >
              Save Case Study
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 