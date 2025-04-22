"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeftIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function NewProjectPage() {
  const router = useRouter();
  const [project, setProject] = useState({
    title: "",
    description: "",
    dueDate: "",
    tags: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Project data:", project);
      console.log("Image:", image);
      
      // Redirect back to projects page
      router.push("/dashboard/projects");
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeftIcon className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">New Project</h1>
          <p className="text-white/60 mt-1">Create a new project</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 rounded-xl p-6 border border-white/10"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Project Title</Label>
            <Input
              id="title"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
              placeholder="Enter project title"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              placeholder="Enter project description"
              rows={4}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-white">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={project.dueDate}
              onChange={(e) =>
                setProject({ ...project, dueDate: e.target.value })
              }
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-white">Tags</Label>
            <Input
              id="tags"
              value={project.tags}
              onChange={(e) =>
                setProject({ ...project, tags: e.target.value })
              }
              placeholder="Enter tags (comma separated)"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-white">Project Image</Label>
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-32 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <>
                    <img 
                      src={imagePreview} 
                      alt="Project preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white hover:bg-black/70"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <PhotoIcon className="w-8 h-8 text-white/40" />
                )}
              </div>
              <div className="flex-1">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-white/10 border-white/20 text-white file:bg-[#50a826] file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:hover:bg-[#50a826]/80"
                />
                <p className="text-white/60 text-sm mt-1">
                  Upload a project image (PNG, JPG, GIF up to 5MB)
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Link href="/dashboard/projects">
              <Button
                variant="outline"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-[#50a826] text-white hover:bg-[#50a826]/80 border-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 