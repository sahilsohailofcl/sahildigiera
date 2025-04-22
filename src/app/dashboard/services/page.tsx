"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { ArrowRightIcon, WrenchScrewdriverIcon, CodeBracketIcon, ChartBarIcon, RocketLaunchIcon, PaintBrushIcon, CommandLineIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const designServices = [
  {
    id: 1,
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces that enhance user experience",
    icon: PaintBrushIcon,
    features: [
      "User Research & Personas",
      "Wireframing & Prototyping",
      "Visual Design & Branding",
      "Responsive Design",
      "Design Systems"
    ],
    accentColor: "#317e31"
  },
  {
    id: 2,
    title: "Brand Identity",
    description: "Comprehensive branding solutions to establish your unique identity",
    icon: ChartBarIcon,
    features: [
      "Logo Design",
      "Color Palette & Typography",
      "Brand Guidelines",
      "Marketing Materials",
      "Visual Identity System"
    ],
    accentColor: "#50a826"
  }
];

const developmentServices = [
  {
    id: 3,
    title: "Web Development",
    description: "Custom web applications and websites built with modern technologies",
    icon: CodeBracketIcon,
    features: [
      "Frontend Development",
      "Backend Development",
      "API Integration",
      "Database Design",
      "Performance Optimization"
    ],
    accentColor: "#45b645"
  },
  {
    id: 4,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    icon: CommandLineIcon,
    features: [
      "iOS Development",
      "Android Development",
      "Cross-platform Solutions",
      "App Store Optimization",
      "Push Notifications"
    ],
    accentColor: "#3a8f3a"
  },
  {
    id: 5,
    title: "Technical Support",
    description: "Expert technical support and maintenance services",
    icon: WrenchScrewdriverIcon,
    features: [
      "24/7 Support",
      "Performance Monitoring",
      "Security Updates",
      "Backup & Recovery",
      "Technical Consultation"
    ],
    accentColor: "#3a8f3a"
  },
  {
    id: 6,
    title: "Business Growth",
    description: "Strategic consulting and growth acceleration services",
    icon: RocketLaunchIcon,
    features: [
      "Business Strategy",
      "Market Analysis",
      "Growth Planning",
      "Competitor Research",
      "Performance Metrics"
    ],
    accentColor: "#3a8f3a"
  }
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "design" | "development">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = [...designServices, ...developmentServices].filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === "all") return matchesSearch;
    if (activeCategory === "design") return matchesSearch && designServices.some(s => s.id === service.id);
    if (activeCategory === "development") return matchesSearch && developmentServices.some(s => s.id === service.id);
    
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Our Services</h1>
          <p className="text-white/60 mt-1">
            Explore our comprehensive range of services designed to help your business succeed.
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-white/40" />
          </div>
          <input
            type="text"
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#50a826]/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === "all"
              ? "bg-[#50a826] text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          All Services
        </button>
        <button
          onClick={() => setActiveCategory("design")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === "design"
              ? "bg-[#50a826] text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          Design
        </button>
        <button
          onClick={() => setActiveCategory("development")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === "development"
              ? "bg-[#50a826] text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          Development
        </button>
      </div>

      {filteredServices.length === 0 ? (
        <div className="bg-white/5 rounded-xl p-12 border border-white/10 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <MagnifyingGlassIcon className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No services found</h3>
          <p className="text-white/60 mb-4">Try adjusting your search or filter criteria</p>
          <Button 
            variant="outline" 
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#50a826]/30 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${service.accentColor}20` }}
                  >
                    <service.icon className="w-6 h-6" style={{ color: service.accentColor }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{service.title}</h2>
                    <p className="text-white/60 text-sm">{service.description}</p>
                  </div>
                </div>
                
                <div className="mb-6 flex-grow">
                  <h4 className="text-sm font-medium text-white/70 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div 
                          className="flex-shrink-0 mt-1 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${service.accentColor}20` }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.accentColor }} />
                        </div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={`/dashboard/services/${service.id}`} className="block flex-1">
                      <Button 
                        variant="outline"
                        className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Need something specific?</h2>
            <p className="text-white/60 mt-1">
              We can create a custom solution tailored to your unique requirements.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <Link href="/dashboard/custom-plan">
              <Button 
                className="bg-[#50a826] text-white hover:bg-[#50a826]/80 border-none"
              >
                Build Custom Solution
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}