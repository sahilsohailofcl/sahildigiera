"use client";
import { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";

const categories = [
  "Design",
  "Development",
  "Marketing",
  "Business",
  "Technology",
  "Strategy",
];

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  status: "draft" | "published";
}

export default function EditCaseStudyPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<CaseStudy>({
    id: "",
    title: "",
    category: "",
    description: "",
    challenge: "",
    solution: "",
    results: [],
    technologies: [],
    status: "draft",
  });

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/case-studies/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch case study");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching case study:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCaseStudy();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/case-studies/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update case study");
      }

      // Redirect to the case studies list page on success
      window.location.href = "/admin/dashboard/case-studies";
    } catch (error) {
      console.error("Error updating case study:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "results" || name === "technologies" 
        ? value.split(",").map(item => item.trim()).filter(Boolean)
        : value,
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
          href="/admin/dashboard/case-studies"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Case Studies
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit Case Study</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
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
              className="block text-sm font-medium text-gray-700"
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
              className="block text-sm font-medium text-gray-700"
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
              className="block text-sm font-medium text-gray-700"
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
              className="block text-sm font-medium text-gray-700"
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
              className="block text-sm font-medium text-gray-700"
            >
              Results
            </label>
            <textarea
              name="results"
              id="results"
              rows={3}
              value={formData.results.join(", ")}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="technologies"
              className="block text-sm font-medium text-gray-700"
            >
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              name="technologies"
              id="technologies"
              value={formData.technologies.join(", ")}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-[#50a826] focus:outline-none focus:ring-1 focus:ring-[#50a826]"
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
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
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Update Case Study
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 