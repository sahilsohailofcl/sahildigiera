"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

// Define CaseStudy Type
interface CaseStudy {
  id: string;
  title: string;
  description: string;
  category: string | null;
  results: string[];
  challenge?: string | null;
  solution?: string | null;
  technologies: string[];
  coverImage?: string | null;
  metrics?: any | null;
  userId: string;
  user?: {
    name: string | null;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

// API Base URL
const API_URL = "/api/case-studies";

export default function CaseStudiesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [newCaseStudy, setNewCaseStudy] = useState<Partial<CaseStudy>>({
    title: "",
    description: "",
    category: "",
    results: [],
    challenge: "",
    solution: "",
    technologies: [],
    coverImage: "",
    metrics: "",
  });
  const [editingCaseStudy, setEditingCaseStudy] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/case-studies");
        if (!response.ok) {
          throw new Error("Failed to fetch case studies");
        }
        const data = await response.json();
        setCaseStudies(data);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const handleAddOrEditCaseStudy = async () => {
    try {
      const caseStudyData = {
        title: newCaseStudy.title,
        description: newCaseStudy.description,
        category: newCaseStudy.category,
        results: newCaseStudy.results || [],
        challenge: newCaseStudy.challenge || null,
        solution: newCaseStudy.solution || null,
        technologies: newCaseStudy.technologies || [],
        coverImage: newCaseStudy.coverImage || null,
        metrics: newCaseStudy.metrics || null,
        userId: 1, // Replace with dynamic user ID
      };

      let updatedList;
      if (editingCaseStudy) {
        // Update Case Study
        const response = await fetch(`${API_URL}/${editingCaseStudy}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(caseStudyData),
        });
        if (!response.ok) throw new Error("Failed to update case study");

        const updatedCase = await response.json();
        updatedList = caseStudies.map((cs) =>
          cs.id === editingCaseStudy ? updatedCase : cs
        );
      } else {
        // Create New Case Study
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(caseStudyData),
        });
        if (!response.ok) throw new Error("Failed to create case study");

        const newCase = await response.json();
        updatedList = [...caseStudies, newCase];
      }

      setCaseStudies(updatedList);
      setNewCaseStudy({
        title: "",
        description: "",
        category: "",
        results: [],
        challenge: "",
        solution: "",
        technologies: [],
        coverImage: "",
        metrics: "",
      });
      setEditingCaseStudy(null);
    } catch (error) {
      console.error("Error saving case study:", error);
    }
  };

  const handleEdit = (cs: CaseStudy) => {
    setNewCaseStudy({
      ...cs,
      results: cs.results || "",
      technologies: cs.technologies || "",
      coverImage: cs.coverImage || "",
      metrics: cs.metrics || "",
    });
    setEditingCaseStudy(cs.id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this case study?")) {
      try {
        const response = await fetch(`/api/case-studies/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete case study");
        }

        // Remove the deleted case study from the state
        setCaseStudies((prev) => prev.filter((cs) => cs.id !== id));
      } catch (error) {
        console.error("Error deleting case study:", error);
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

  // Filter case studies based on search query and filters
  const filteredCaseStudies = caseStudies.filter((caseStudy) => {
    const matchesSearch = caseStudy.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || caseStudy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-2xl font-bold text-white">Case Studies</h1>
          <p className="text-white/60 mt-1">Manage your case studies</p>
        </div>
        <Link
          href="/admin/dashboard/case-studies/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#50a826] text-white rounded-lg hover:bg-[#317e31] transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          New Case Study
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-white/60">Total Case Studies</h3>
            <DocumentTextIcon className="w-5 h-5 text-[#50a826]" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">12</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-white/60">Published</h3>
            <EyeIcon className="w-5 h-5 text-[#50a826]" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">8</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-white/60">Total Views</h3>
            <ChartBarIcon className="w-5 h-5 text-[#50a826]" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">3.5k</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search case studies..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#50a826]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#50a826]">
          <option value="all">All Categories</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="marketing">Marketing</option>
        </select>
        <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#50a826]">
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Case Studies Table */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/60">Title</th>
              <th className="text-left p-4 text-white/60">Category</th>
              <th className="text-left p-4 text-white/60">Status</th>
              <th className="text-left p-4 text-white/60">Last Updated</th>
              <th className="text-right p-4 text-white/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCaseStudies.map((caseStudy) => (
              <tr key={caseStudy.id} className="border-b border-white/10 last:border-0">
                <td className="p-4 text-white">{caseStudy.title}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-sm bg-blue-500/20 text-blue-500">
                    {caseStudy.category || "Uncategorized"}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-sm bg-green-500/20 text-green-500">
                    Active
                  </span>
                </td>
                <td className="p-4 text-white/60">{formatDate(caseStudy.updatedAt)}</td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/dashboard/case-studies/${caseStudy.id}/edit`}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      title="Edit case study"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(caseStudy.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors"
                      title="Delete case study"
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
        <p className="text-white/60">Showing {filteredCaseStudies.length} of {caseStudies.length} case studies</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
