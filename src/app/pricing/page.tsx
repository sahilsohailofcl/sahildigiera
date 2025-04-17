"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { PricingCard } from '@/components/PricingCard';
import { useSession } from "next-auth/react";
import { Button } from '@/components/ui/button';
import { Header } from '@/app/sections/Header';
import { Footer } from '@/app/sections/Footer';

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
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID,
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
    priceId: process.env.NEXT_PUBLIC_STRIPE_GROWTH_PRICE_ID,
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
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
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
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID,
    accentColor: "#3a8f3a",
    buttonText: "Contact Sales"
  }
];

const plans = [
  {
    name: 'Monthly',
    price: '$9.99',
    description: 'Perfect for trying out our service',
    features: [
      'All basic features',
      'Email support',
      '1GB storage',
      'Basic analytics',
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    billingPeriod: 'monthly',
  },
  {
    name: 'Annual',
    price: '$99.99',
    description: 'Best value for long-term users',
    features: [
      'All premium features',
      'Priority support',
      '10GB storage',
      'Advanced analytics',
      '2 months free',
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
    billingPeriod: 'annual',
  },
];

export default function PricingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && !session?.user?.hasSelectedPlan) {
      router.push("/signup");
    }
  }, [status, router, session]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render content if not authenticated or hasn't selected plan
  if (status !== "authenticated" || !session?.user?.hasSelectedPlan) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getDisplayPrice = (plan: typeof combinedPricingTiers[0]) => {
    const price = billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
    return formatPrice(price);
  };

  const handlePlanSelect = async (priceId: string | undefined, planTitle: string) => {
    if (!session) {
      router.push("/login");
      return;
    }

    if (!priceId) {
      setError("Price ID is not available for this plan");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (priceId === process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID) {
        // For Starter plan, create a trial subscription
        const response = await fetch("/api/trial", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan: "starter"
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to start trial");
        }

        // Redirect to dashboard after successful trial creation
        router.push("/dashboard");
        return;
      } else if (planTitle === "Elite") {
        router.push("/contact");
        return;
      }

      // For paid plans, create Stripe checkout session
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (priceId: string, billingPeriod: string) => {
    router.push(`/checkout?priceId=${priceId}&billingPeriod=${billingPeriod}`);
  };

  return (
    <section className="bg-black relative overflow-hidden">
      <Header />
      <div className="py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 100 * Math.sin(i * 0.5)],
                y: [0, 100 * Math.cos(i * 0.7)],
              }}
              transition={{
                duration: 20 + i * 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="absolute rounded-full w-64 h-64 blur-3xl"
              style={{
                top: `${10 + (i * 15) % 80}%`,
                left: `${10 + (i * 20) % 80}%`,
                backgroundColor: "#317e31",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
              Pricing Plans
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                Simple, transparent
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
                pricing
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Choose a plan that fits your business needs. All plans include our premium support and satisfaction guarantee.
            </p>

            <div className="inline-flex items-center bg-white/5 rounded-full p-1.5 mt-8 border border-white/10">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={twMerge(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  billingPeriod === "monthly"
                    ? "bg-[#317e31] text-white"
                    : "text-white/60 hover:text-white"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={twMerge(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  billingPeriod === "annual"
                    ? "bg-[#317e31] text-white"
                    : "text-white/60 hover:text-white"
                )}
              >
                Annual (20% off)
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {combinedPricingTiers.map((tier, index) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className={twMerge(
                  "relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm overflow-hidden flex flex-col",
                  tier.popular && "border-[#50a826]/50 shadow-lg shadow-[#317e31]/20"
                )}
                whileHover={{ y: -10 }}
              >
                {tier.popular && (
                  <div 
                    className="absolute top-0 right-6 bg-[#50a826] text-white text-xs font-bold px-4 py-1 rounded-b-lg"
                    style={{ backgroundColor: tier.accentColor }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{tier.title}</h3>
                    <p className="text-white/60 text-sm">{tier.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-white">
                        {getDisplayPrice(tier)}
                      </span>
                      <span className="text-white/60 mb-1.5">/{billingPeriod}</span>
                    </div>
                    {billingPeriod === "annual" && (
                      <p className="text-sm text-white/60 mt-1">
                        <span className="line-through">{formatPrice(tier.monthlyPrice * 12)}</span> {formatPrice(tier.annualPrice)} billed annually
                      </p>
                    )}
                  </div>

                  <motion.button
                    onClick={() => tier.priceId ? handlePlanSelect(tier.priceId, tier.title) : setError("Price ID is not available for this plan")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={twMerge(
                      "w-full py-3 px-4 rounded-lg font-medium text-center mb-6 transition-all flex items-center justify-center",
                      tier.popular
                        ? `bg-gradient-to-r from-[${tier.accentColor}] to-[#50a826] text-white hover:shadow-lg hover:shadow-[${tier.accentColor}]/30`
                        : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
                    )}
                  >
                    {tier.buttonText}
                  </motion.button>

                  <div className="border-t border-white/10 pt-8 mt-8">
                    <p className="text-xs font-bold text-white/70 uppercase mb-3">What's included:</p>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div 
                            className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${tier.accentColor}20` }}
                          >
                            <svg
                              className="w-3 h-3"
                              style={{ color: tier.accentColor }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-white/60 mb-6">Need something custom?</p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-transparent border border-[#317e31] text-[#50a826] font-medium hover:bg-[#317e31]/10 transition-all"
            >
              Request Custom Plan
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </section>
  );
}