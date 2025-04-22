"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { ArrowLeftIcon, CheckIcon, WrenchScrewdriverIcon, CurrencyDollarIcon, ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const availableFeatures = [
  { id: "responsive", label: "Responsive Design", category: "Design" },
  { id: "cms", label: "CMS Integration", category: "Functionality" },
  { id: "seo", label: "SEO Optimization", category: "Marketing" },
  { id: "analytics", label: "Analytics & Reporting", category: "Analytics" },
  { id: "security", label: "Security Features", category: "Security" },
  { id: "api", label: "API Development", category: "Development" },
  { id: "mobile", label: "Mobile App", category: "Platform" },
  { id: "ecommerce", label: "E-commerce", category: "Functionality" },
  { id: "social", label: "Social Integration", category: "Integration" },
  { id: "multilingual", label: "Multilingual Support", category: "Localization" }
];

export default function CustomPlanPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    description: "",
    features: "",
    timeline: "",
    budget: "",
    additionalInfo: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the custom plan request to your backend
    console.log("Custom plan submitted:", { ...formData, selectedFeatures });
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  if (isSubmitted) {
    return (
      <div className="space-y-8">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#50a826]/20 flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-8 h-8 text-[#50a826]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Custom Plan Request Submitted!</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Thank you for your interest in a custom plan. Our team will review your requirements and contact you within 24 hours with a tailored proposal.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard/pricing">
                <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back to Pricing
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button style={{ backgroundColor: "#50a826", color: "white" }}>
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Create Custom Plan</h1>
          <p className="text-white/60 mt-1">
            Tell us about your project and we'll create a tailored solution for your needs
          </p>
        </div>
        <Link href="/dashboard/pricing">
          <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Pricing
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-6">Project Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white/80">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-white/80">Project Type</Label>
                  <Input
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="e.g. Web Application, Mobile App, etc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white/80">Project Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  placeholder="Please describe your project in detail..."
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80">Desired Features</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableFeatures.map(feature => (
                    <div 
                      key={feature.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedFeatures.includes(feature.id)
                          ? "bg-[#50a826]/20 border border-[#50a826]/30"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                      onClick={() => toggleFeature(feature.id)}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                        selectedFeatures.includes(feature.id)
                          ? "bg-[#50a826]"
                          : "bg-white/10"
                      }`}>
                        {selectedFeatures.includes(feature.id) && (
                          <CheckIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm">{feature.label}</p>
                        <p className="text-white/50 text-xs">{feature.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features" className="text-white/80">Additional Features</Label>
                <Textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  className="min-h-[80px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  placeholder="Describe any additional features not listed above..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timeline" className="text-white/80">Expected Timeline</Label>
                  <Input
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="e.g. 3 months"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-white/80">Budget Range</Label>
                  <Input
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="e.g. $5000-$10000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="text-white/80">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="min-h-[80px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  placeholder="Any other information you'd like to share..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                style={{ backgroundColor: "#50a826", color: "white" }}
              >
                Submit Custom Plan Request
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-6">Why Choose a Custom Plan?</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0">
                  <WrenchScrewdriverIcon className="w-5 h-5 text-[#50a826]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Tailored to Your Needs</h3>
                  <p className="text-white/60 text-sm">Get exactly what you need without paying for features you don't use</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0">
                  <CurrencyDollarIcon className="w-5 h-5 text-[#50a826]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Flexible Pricing</h3>
                  <p className="text-white/60 text-sm">Choose the features that fit your budget</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="w-5 h-5 text-[#50a826]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Custom Timeline</h3>
                  <p className="text-white/60 text-sm">Work with a schedule that fits your project needs</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0">
                  <DocumentTextIcon className="w-5 h-5 text-[#50a826]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Detailed Proposal</h3>
                  <p className="text-white/60 text-sm">Receive a comprehensive plan tailored to your requirements</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 mt-6">
              <h3 className="text-white font-medium mb-3">What happens next?</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#50a826] text-xs font-medium">1</span>
                  </span>
                  <span className="text-white/80">Our team reviews your requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#50a826] text-xs font-medium">2</span>
                  </span>
                  <span className="text-white/80">We'll contact you within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#50a826] text-xs font-medium">3</span>
                  </span>
                  <span className="text-white/80">Custom proposal and timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#50a826] text-xs font-medium">4</span>
                  </span>
                  <span className="text-white/80">Project kickoff and development</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 