"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  TagIcon,
  ClockIcon,
  UserIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// Mock project data - in a real app, this would come from an API
const mockProjects = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved UX",
    lastUpdated: "2 days ago",
    dueDate: "2024-04-15",
    tags: "Design, Development",
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
    tags: "Mobile, Development",
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
    tags: "Marketing, Content",
    manager: "Sarah Wilson",
    progress: 90,
    status: "Review",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2339&q=80",
  },
];

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch project data
    setTimeout(() => {
      const projectData = mockProjects.find(p => p.id === params.id);
      if (projectData) {
        setProject(projectData);
      }
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleDeleteProject = () => {
    if (confirm("Are you sure you want to delete this project?")) {
      // In a real app, this would be an API call
      console.log("Deleting project:", project.id);
      router.push("/dashboard/projects");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/60">Loading project data...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-white/60 mb-4">Project not found</div>
        <Link href="/dashboard/projects">
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{project.title}</h1>
            <p className="text-white/60 mt-1">Project Details</p>
          </div>
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
            onClick={handleDeleteProject}
            className="text-white hover:bg-white/10"
          >
            <TrashIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 rounded-xl p-6 border border-white/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
                <p className="text-white/80">{project.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.split(", ").map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden bg-white/10">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/60">
                <UserIcon className="w-5 h-5" />
                <span>Manager: {project.manager}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <CalendarIcon className="w-5 h-5" />
                <span>Due: {project.dueDate}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <ClockIcon className="w-5 h-5" />
                <span>Last updated: {project.lastUpdated}</span>
              </div>
              
              {/* Progress Bar */}
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
              
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                <span className="text-white/60">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 