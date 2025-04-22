"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  TagIcon,
  ArrowRightIcon,
  UserIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface Project {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  dueDate: string;
  tags: string[];
  manager: string;
  progress: number;
  status: string;
  imageUrl: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Website Redesign",
      description: "Complete overhaul of the company website with modern design and improved UX",
      lastUpdated: "2 days ago",
      dueDate: "2024-04-15",
      tags: ["Design", "Development"],
      manager: "John Doe",
      progress: 75,
      status: "In Progress",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80",
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Creating a cross-platform mobile application for iOS and Android",
      lastUpdated: "1 week ago",
      dueDate: "2024-05-20",
      tags: ["Mobile", "Development"],
      manager: "Mike Johnson",
      progress: 30,
      status: "Planning",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: "3",
      title: "Marketing Campaign",
      description: "Q2 digital marketing campaign focusing on social media and content marketing",
      lastUpdated: "3 days ago",
      dueDate: "2024-04-30",
      tags: ["Marketing", "Content"],
      manager: "Sarah Wilson",
      progress: 90,
      status: "Review",
      imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2339&q=80",
    },
  ]);

  const handleDeleteProject = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== projectId));
    }
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'in progress':
        return 'bg-blue-500/20 text-blue-400';
      case 'planning':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'review':
        return 'bg-purple-500/20 text-purple-400';
      case 'on hold':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-white/60 mt-1">Manage and track your ongoing projects</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button
            className="bg-[#50a826] text-white hover:bg-[#50a826]/80 border-none"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <div className="aspect-video rounded-lg overflow-hidden bg-white/10">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{project.title}</h2>
                    <p className="text-white/60 text-sm mt-1">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/projects/${project.id}/edit`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-white hover:bg-white/10"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/60">
                      <UserIcon className="w-5 h-5" />
                      <span>Manager: {project.manager}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <CalendarIcon className="w-5 h-5" />
                      <span>Due: {project.dueDate}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/60">
                      <TagIcon className="w-5 h-5" />
                      <span>Tags: {project.tags.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <span>Last updated: {project.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* Progress and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/60">
                        <ChartBarIcon className="w-5 h-5" />
                        <span>Progress</span>
                      </div>
                      <span className="text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div 
                        className="bg-[#50a826] h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-white/60" />
                    <span className="text-white/60">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <Button
                      variant="outline"
                      className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      View Details
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 