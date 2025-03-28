"use client";
import CheckIcon from "../assets/check.svg";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import ArrowRight from "../assets/arrow-right.svg";
import { useState } from "react";

const pricingTiers = [
  {
    title: "Starter",
    monthlyPrice: 299,
    annualPrice: 2870, // ~20% discount
    buttonText: "Get Started",
    buttonLink: "/contact",
    popular: false,
    features: [
      "Custom Web Development (up to 5 pages)",
      "Basic CMS Setup",
      "Social Media Marketing (2 platforms)",
      "Content Marketing (2 blog posts/month)",
      "On-Page SEO (up to 5 pages)",
      "Basic Analytics Setup",
      "Email Support",
    ],
    accentColor: "#317e31",
  },
  {
    title: "Growth",
    monthlyPrice: 799,
    annualPrice: 7670, // ~20% discount
    buttonText: "Start Growing",
    buttonLink: "/contact",
    popular: true,
    features: [
      "Custom Web Development (up to 10 pages)",
      "Advanced CMS Setup",
      "Social Media Marketing (4 platforms)",
      "Content Marketing (4 blog posts/month)",
      "On-Page SEO (up to 10 pages)",
      "Off-Page SEO (5 backlinks/month)",
      "PPC Campaign Management ($500 ad spend)",
      "Technical SEO Audit",
      "Monthly Performance Reports",
      "Priority Support",
    ],
    accentColor: "#50a826",
  },
  {
    title: "Enterprise",
    monthlyPrice: 1499,
    annualPrice: 14390, // ~20% discount
    buttonText: "Contact Sales",
    buttonLink: "/contact",
    popular: false,
    features: [
      "Custom Web Development (unlimited)",
      "Advanced CMS with Custom Features",
      "Social Media Marketing (6 platforms)",
      "Content Marketing (8 blog posts/month)",
      "Comprehensive SEO Strategy",
      "PPC Campaign Management ($2000 ad spend)",
      "Technical SEO Optimization",
      "Advanced Analytics & Reporting",
      "Dedicated Account Manager",
      "Custom Integrations",
      "24/7 Priority Support",
    ],
    accentColor: "#3a8f3a",
  },
];

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
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
            className={`absolute rounded-full w-64 h-64 blur-3xl`}
            style={{
              top: `${10 + (i * 15) % 80}%`,
              left: `${10 + (i * 20) % 80}%`,
              backgroundColor: "#317e31",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
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

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-white/5 rounded-full p-1.5 mt-8 border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-[#317e31] text-white' : 'text-white/60 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'annual' ? 'bg-[#317e31] text-white' : 'text-white/60 hover:text-white'}`}
            >
              Annual (20% off)
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={twMerge(
                "relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm overflow-hidden",
                tier.popular && "border-[#50a826]/50 shadow-lg shadow-[#317e31]/20"
              )}
              whileHover={{ y: -10 }}
            >
              {tier.popular && (
                <div className="absolute top-0 right-6 bg-[#50a826] text-white text-xs font-bold px-4 py-1 rounded-b-lg">
                  Most Popular
                </div>
              )}

              <div className="p-8 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.title}</h3>
                <p className="text-white/60 mb-6">Perfect for {tier.title.toLowerCase()} businesses</p>

                <div className="mb-8">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold text-white">
                      ${billingCycle === 'monthly' ? tier.monthlyPrice : tier.annualPrice/12}
                    </span>
                    <span className="text-white/60 mb-1.5">/month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-white/60 mt-1">
                      <span className="line-through">${tier.monthlyPrice * 12}</span> ${tier.annualPrice} billed annually
                    </p>
                  )}
                </div>

                <motion.a
                  href={tier.buttonLink}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={twMerge(
                    "w-full py-3.5 rounded-lg font-medium text-center mb-8 transition-all",
                    tier.popular 
                      ? "bg-gradient-to-r from-[#317e31] to-[#50a826] text-white hover:shadow-lg hover:shadow-[#317e31]/30"
                      : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
                  )}
                >
                  {tier.buttonText}
                </motion.a>

                <div className="border-t border-white/10 pt-6 mt-auto">
                  <ul className="space-y-4">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-[#317e31]/20 flex items-center justify-center">
                          <CheckIcon className="w-3 h-3 text-[#50a826]" />
                        </div>
                        <span className="text-white/90">{feature}</span>
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-transparent border border-[#317e31] text-[#50a826] font-medium hover:bg-[#317e31]/10 transition-all"
          >
            Request Custom Plan
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};