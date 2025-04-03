"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Define CaseStudy Type
interface CaseStudy {
  id: string;
  title: string;
  description: string;
  category: string;
  results: string[];
  challenge?: string;
  solution?: string;
  technologies: string[];
  coverImage?: string | null;
  metrics?: string | null;
}

// API Base URL
const API_URL = "/api/case-studies";

export default function CaseStudyManagement() {
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

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch case studies");

        const data = await response.json();
        setCaseStudies(data);
      } catch (error) {
        console.error("Error fetching case studies:", error);
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
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete case study");

      setCaseStudies(caseStudies.filter((cs) => cs.id !== id));
    } catch (error) {
      console.error("Error deleting case study:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 p-6 bg-black/90 border-r border-white/10">
        <h2 className="text-2xl font-bold mb-8 text-[#317e31]">Admin Panel</h2>
        <nav className="space-y-4">
          <Link href="/admin/dashboard" className="block py-2 px-4 rounded-lg hover:bg-white/10">Home</Link>
          <Link href="/admin/dashboard/case-studies" className="block py-2 px-4 rounded-lg hover:bg-white/10">Case Studies</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Case Study Management</h1>

        {/* Add/Edit Form */}
        <motion.div className="mb-8 p-6 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-2xl font-bold mb-4">{editingCaseStudy ? "Edit Case Study" : "Add New Case Study"}</h2>
          <input
            type="text"
            placeholder="Title"
            value={newCaseStudy.title}
            onChange={(e) => setNewCaseStudy({ ...newCaseStudy, title: e.target.value })}
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white"
          />
          <textarea
            placeholder="Description"
            value={newCaseStudy.description}
            onChange={(e) => setNewCaseStudy({ ...newCaseStudy, description: e.target.value })}
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white"
            rows={4}
          />
          <input
            type="text"
            placeholder="Category"
            value={newCaseStudy.category}
            onChange={(e) => setNewCaseStudy({ ...newCaseStudy, category: e.target.value })}
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white"
          />
          <input
            type="text"
            placeholder="Results (comma-separated)"
            value={newCaseStudy.results?.join(", ")} // Convert array to string for the input
            onChange={(e) => setNewCaseStudy({
              ...newCaseStudy,
              results: e.target.value.split(",").map((r) => r.trim()) // Convert string to array
            })}
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white"
          />
          <input
            type="text"
            placeholder="Challenge"
            value={newCaseStudy.challenge}
            onChange={(e) => setNewCaseStudy({ ...newCaseStudy, challenge: e.target.value })}
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white"
          />
          <input
            type="text"
            placeholder="Solution"
            value={newCaseStudy.solution}
            onChange={(e) => setNewCaseStudy({ ...newCaseStudy, solution: e.target.value })}
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white"
          />
          <input
            type="text"
            placeholder="Technologies (comma-separated)"
            value={newCaseStudy.technologies?.join(", ")}
            onChange={(e) => setNewCaseStudy({
              ...newCaseStudy,
              technologies: e.target.value.split(",").map((r) => r.trim()) // Convert string to array
            })}
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white"
          />
          <input
            type="text"
            placeholder="Cover Image URL"
            value={newCaseStudy.coverImage || ""}
            onChange={(e) => setNewCaseStudy({
              ...newCaseStudy,
              coverImage: e.target.value
            })}
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white"
          />
          <input
            type="text"
            placeholder="Metrics (optional)"
            value={newCaseStudy.metrics || ""}
            onChange={(e) => setNewCaseStudy({
              ...newCaseStudy,
              metrics: e.target.value
            })}
            className="w-full p-3 mb-4 rounded-lg bg-white/5 text-white"
          />
          <button onClick={handleAddOrEditCaseStudy} className="py-2 px-6 bg-[#317e31] text-white rounded-lg">{editingCaseStudy ? "Update" : "Add"} Case Study</button>
        </motion.div>

        {/* Display Case Studies */}
        <div className="space-y-6">
          {caseStudies.map((cs) => (
            <motion.div key={cs.id} className="p-6 rounded-lg bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold text-[#317e31] mb-2">{cs.title}</h2>
              <p className="text-white/80 mb-4">{cs.description}</p>
              <p className="text-white/60">Category: {cs.category}</p>
              <button onClick={() => handleEdit(cs)} className="py-1 px-4 bg-blue-500 text-white rounded-lg mr-2">Edit</button>
              <button onClick={() => handleDelete(cs.id)} className="py-1 px-4 bg-red-500 text-white rounded-lg">Delete</button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
