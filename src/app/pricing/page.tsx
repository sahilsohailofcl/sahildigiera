"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Combined pricing tiers with just four tiers
const combinedPricingTiers = [
  {
    title: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for lead generation and trust building",
    features: [
      "1 Free Discovery Call (Zoom or in-app)",
      "Sales assistant explains services",
      "Personalized roadmap via email",
      "Access to client dashboard (limited view)",
      "1 blog or audit guide on their business",
      "Basic Analytics Setup"
    ],
    priceId: "discovery",
    accentColor: "#317e31",
    buttonText: "Get Started"
  },
  {
    title: "Growth",
    monthlyPrice: 499,
    annualPrice: 4790,
    description: "Ideal for freelancers and early-stage startups",
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
    priceId: "launch",
    accentColor: "#50a826",
    buttonText: "Start Launching",
    popular: true
  },
  {
    title: "Pro",
    monthlyPrice: 999,
    annualPrice: 9590,
    description: "For established businesses looking to scale",
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
    priceId: process.env.NEXT_PUBLIC_STRIPE_GROWTH_PRICE_ID!,
    accentColor: "#45b645",
    buttonText: "Start Growing"
  },
  {
    title: "Elite",
    monthlyPrice: 1999,
    annualPrice: 19190,
    description: "Tailored for SaaS companies and enterprises",
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
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID!,
    accentColor: "#3a8f3a",
    buttonText: "Contact Sales"
  }
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handlePlanSelect = async (priceId: string, planTitle: string) => {
    if (priceId === "discovery") {
      try {
        setLoading(true);
        const response = await fetch("/api/trial", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (response.ok) {
          router.push("/dashboard");
        } else {
          const error = await response.json();
          alert(error.message || "Failed to start discovery plan. Please try again.");
        }
      } catch (error) {
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    } else if (planTitle === "Elite") {
      router.push("/contact");
    } else {
      try {
        setLoading(true);
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            priceId,
            billingPeriod 
          }),
        });

        const { id } = await response.json();
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId: id });
      } catch (error) {
        alert("Failed to start checkout. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#317e31] to-[#a8e063]">
          Choose Your Plan
        </h1>
        <p className="text-center text-white/70 max-w-xl mx-auto mb-12">
          Flexible plans designed to meet your business needs. All plans include our core services with different levels of support and delivery.
        </p>
        
        {/* Billing period toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 p-1 rounded-lg flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={twMerge(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                billingPeriod === 'monthly' 
                  ? "bg-gradient-to-r from-[#317e31] to-[#50a826] text-white shadow-md" 
                  : "text-white/60 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={twMerge(
                "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center",
                billingPeriod === 'annual' 
                  ? "bg-gradient-to-r from-[#317e31] to-[#50a826] text-white shadow-md" 
                  : "text-white/60 hover:text-white"
              )}
            >
              Annual
              <span className="ml-2 bg-[#50a826] text-xs px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {combinedPricingTiers.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className={twMerge(
                "relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm overflow-hidden flex flex-col h-full",
                plan.popular && "border-[#50a826]/50 shadow-lg shadow-[#317e31]/20 scale-105 z-10"
              )}
              whileHover={{ y: -10 }}
            >
              {plan.popular && (
                <div 
                  className="absolute top-0 right-6 text-white text-xs font-bold px-4 py-1 rounded-b-lg"
                  style={{ backgroundColor: plan.accentColor }}
                >
                  Most Popular
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{plan.title}</h3>
                  <p className="text-white/60 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">
                      {formatPrice(billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice / 12)}
                    </span>
                    <span className="text-white/60 mb-1.5">/month</span>
                  </div>
                  {billingPeriod === 'annual' && plan.monthlyPrice > 0 && (
                    <div className="mt-1 text-sm text-[#50a826]">
                      {formatPrice(plan.annualPrice)} billed annually
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handlePlanSelect(plan.priceId, plan.title)}
                  disabled={loading}
                  className={twMerge(
                    "w-full py-3 px-4 rounded-lg font-medium text-center mb-6 transition-all flex items-center justify-center",
                    plan.popular
                      ? `bg-gradient-to-r from-[${plan.accentColor}] to-[#50a826] text-white hover:shadow-lg hover:shadow-[${plan.accentColor}]/30`
                      : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
                  )}
                  style={plan.popular ? {
                    background: `linear-gradient(to right, ${plan.accentColor}, #50a826)`
                  } : {}}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    plan.buttonText
                  )}
                </button>

                <div className="border-t border-white/10 pt-8 mt-8">
                  <p className="text-xs font-bold text-white/70 uppercase mb-3">What's included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div 
                          className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${plan.accentColor}20` }}
                        >
                          <svg
                            className="w-3 h-3"
                            style={{ color: plan.accentColor }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-white/90 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/60 text-sm">
            Need a custom solution? <a href="/contact" className="text-[#45b645] underline">Contact our sales team</a> for a tailored package.
          </p>
        </div>
      </div>
    </div>
  );
}