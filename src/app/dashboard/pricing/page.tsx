"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";

const services = [
  {
    id: "starter",
    title: "Starter",
    description: "Perfect for lead generation and trust building",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "1 Free Discovery Call (Zoom or in-app)",
      "Sales assistant explains services",
      "Personalized roadmap via email",
      "Access to client dashboard (limited view)",
      "1 blog or audit guide on their business",
      "Basic Analytics Setup"
    ],
    icon: "🌱",
    accentColor: "#317e31"
  },
  {
    id: "growth",
    title: "Growth",
    description: "Ideal for freelancers and early-stage startups",
    monthlyPrice: 499,
    annualPrice: 4790,
    features: [
      "Custom Web Development (up to 5 pages)",
      "Basic CMS Setup",
      "1 design task per week",
      "1 development task every 2 weeks",
      "1 SEO audit report & optimization",
      "Content Marketing (2 blog posts/month)",
      "Social Media Marketing (2 platforms)",
      "Basic support (email / 1 call per month)",
      "5-day delivery turnaround"
    ],
    icon: "🚀",
    accentColor: "#50a826"
  },
  {
    id: "pro",
    title: "Pro",
    description: "For established businesses looking to scale",
    monthlyPrice: 999,
    annualPrice: 9590,
    features: [
      "Custom Web Development (up to 10 pages)",
      "Advanced CMS Setup",
      "Unlimited requests (one at a time)",
      "Weekly dev/design/marketing execution",
      "Custom landing pages, ads, email templates",
      "Content Marketing (4 blog posts/month)",
      "Social Media Marketing (4 platforms)",
      "On-Page SEO (up to 10 pages)",
      "Off-Page SEO (5 backlinks/month)",
      "PPC Campaign Management ($500 ad spend)",
      "Technical SEO Audit",
      "Performance reports",
      "Priority live chat",
      "2 calls/month"
    ],
    icon: "💼",
    accentColor: "#45b645"
  },
  {
    id: "elite",
    title: "Elite",
    description: "Tailored for SaaS companies and enterprises",
    monthlyPrice: 1999,
    annualPrice: 19190,
    features: [
      "Custom Web Development (unlimited)",
      "Advanced CMS with Custom Features",
      "Dedicated account manager",
      "24-48 hr turnaround",
      "Up to 3 simultaneous tasks",
      "A/B testing, conversion strategy",
      "Full-stack dev (React, Next.js, API)",
      "Social Media Marketing (6 platforms)",
      "Content Marketing (8 blog posts/month)",
      "Comprehensive SEO Strategy",
      "PPC Campaign Management ($2000 ad spend)",
      "Technical SEO Optimization",
      "Advanced Analytics & Reporting",
      "Custom Integrations",
      "Weekly progress calls",
      "24/7 Priority Support via Slack/WhatsApp"
    ],
    icon: "🏢",
    accentColor: "#3a8f3a"
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    // Get service from URL parameter
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const plan = params.get("plan");
    
    if (service) {
      setSelectedService(service);
      // Scroll to the selected service
      const element = document.getElementById(service);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (plan === "custom") {
      // Scroll to custom plan section
      const element = document.getElementById("custom-plan");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Pricing Plans</h1>
        <p className="text-white/60 mt-2">
          Choose the perfect plan for your business needs
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white/5 rounded-lg p-1 inline-flex">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={twMerge(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              billingCycle === "monthly"
                ? "bg-white text-black"
                : "text-white/60 hover:text-white"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={twMerge(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              billingCycle === "annual"
                ? "bg-white text-black"
                : "text-white/60 hover:text-white"
            )}
          >
            Annual
            <span className="ml-1 text-xs text-[#50a826]">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={twMerge(
              "bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col",
              selectedService === service.id && "ring-2 ring-[#50a826]"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${service.accentColor}20` }}
              >
                {service.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="text-white/60 text-sm">{service.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">
                  {formatPrice(billingCycle === "monthly" ? service.monthlyPrice : service.annualPrice)}
                </span>
                <span className="text-white/60">/ {billingCycle === "monthly" ? "month" : "year"}</span>
              </div>
            </div>

            <div className="flex-grow">
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/60">
                    <CheckIcon className="w-5 h-5 text-[#50a826]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Link href={`/dashboard/order?service=${service.id}&billing=${billingCycle}`} className="mt-auto">
              <Button 
                className="w-full"
                style={{ 
                  backgroundColor: service.accentColor,
                  color: "white"
                }}
              >
                Subscribe Now
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>

      <div id="custom-plan" className="bg-white/5 rounded-xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Need a custom solution?</h2>
            <p className="text-white/60 mt-1">
              We can create a tailored plan that perfectly matches your requirements.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard/custom-plan">
              <Button 
                className="bg-[#50a826] text-white hover:bg-[#50a826]/80 border-none"
              >
                Build Custom Plan
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard/services">
              <Button 
                variant="outline"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 