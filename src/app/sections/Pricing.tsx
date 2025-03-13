"use client";

import CheckIcon from "../assets/check.svg";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const pricingTiers = [
  {
    title: "Starter",
    monthlyPrice: 299,
    buttonText: "Contact us",
    buttonLink: "/contact",
    popular: false,
    inverse: false,
    features: [
      "Custom Web Development (up to 5 pages)",
      "Basic Shopify/Wix/Webflow/Framer Setup",
      "Social Media Marketing (2 platforms)",
      "Content Marketing (2 blog posts/month)",
      "On-Page SEO (up to 5 pages)",
      "Basic Analytics Setup",
      "Email Support",
    ],
  },
  {
    title: "Growth",
    monthlyPrice: 799,
    buttonText: "Contact us",
    buttonLink: "/contact",
    popular: true,
    inverse: true,
    features: [
      "Custom Web Development (up to 10 pages)",
      "Advanced Shopify/Wix/Webflow/Framer Setup",
      "Social Media Marketing (4 platforms)",
      "Content Marketing (4 blog posts/month)",
      "On-Page SEO (up to 10 pages)",
      "Off-Page SEO (5 backlinks/month)",
      "PPC Campaign Management (up to $500 ad spend)",
      "Technical SEO Audit",
      "Monthly Performance Reports",
      "Priority Email & Chat Support",
    ],
  },
  {
    title: "Enterprise",
    monthlyPrice: 1499,
    buttonText: "Contact us",
    buttonLink: "/contact",
    popular: false,
    inverse: false,
    features: [
      "Custom Web Development (unlimited pages)",
      "Advanced Shopify/Wix/Webflow/Framer Setup with Custom Features",
      "Social Media Marketing (6 platforms)",
      "Content Marketing (8 blog posts/month)",
      "On-Page SEO (unlimited pages)",
      "Off-Page SEO (10 backlinks/month)",
      "PPC Campaign Management (up to $2000 ad spend)",
      "Technical SEO Audit & Optimization",
      "Advanced Analytics & Reporting",
      "Dedicated Account Manager",
      "API Access & Custom Integrations",
      "24/7 Priority Support",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container">
        <div className="section-heading text-center">
          <h2 className="section-title text-4xl md:text-5xl font-bold bg-gradient-to-b from-white/90 to-[#317e31] text-transparent bg-clip-text">
            Pricing Plans
          </h2>
          <p className="section-description mt-5 text-white/60 max-w-2xl mx-auto">
            Choose a plan that fits your business needs. Whether you&#39;re just starting out or scaling up, we have the perfect solution for you.
          </p>
        </div>
        <div className="flex flex-col gap-8 items-center mt-16 lg:flex-row lg:items-stretch lg:justify-center">
          {pricingTiers.map(({ title, monthlyPrice, buttonText, buttonLink, popular, inverse, features }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={twMerge(
                "card w-full max-w-sm p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-black/50 to-black/20 backdrop-blur-sm shadow-2xl shadow-green-500/50 hover:shadow-3xl hover:shadow-green-500/70 transition-shadow duration-300 relative", // Added `relative` for pseudo-element
                inverse && "bg-gradient-to-b from-white to-white/90 border-white/20 shadow-2xl shadow-white/20 hover:shadow-3xl hover:shadow-white/30"
              )}
            >
              {/* Animated Border for Growth Card */}
              {popular && (
                <motion.div
                  className="absolute inset-0 rounded-2xl z-0"
                  style={{
                    background: "linear-gradient(to right, #dd7ddf, #e1cd86, #bbcb92, #71c2ef, #3bffff, #dd7ddf, #dd7ddf, #e1cd86, #bbcb92, #71c2ef, #3bffff, #dd7ddf)",
                    backgroundSize: "200%",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", // Creates a border effect
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", // For Safari
                    padding: "1px", // Border width
                  }}
                  animate={{
                    backgroundPositionX: "-100%",
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                />
              )}
              <div className="relative z-10">
                <div className="flex justify-between items-center">
                  <h3
                    className={twMerge(
                      "text-2xl font-bold",
                      inverse ? "text-black" : "text-white"
                    )}
                  >
                    {title}
                  </h3>
                  {popular && (
                    <div className="inline-flex text-sm px-4 py-1.5 rounded-full border border-black/20 bg-black">
                      <motion.span
                        animate={{
                          backgroundPositionX: "-100%",
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                          repeatType: "loop",
                        }}
                        className="bg-white [background-size:200%] text-transparent bg-clip-text font-medium"
                      >
                        Popular
                      </motion.span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-2 mt-6">
                  <span className={twMerge("text-5xl font-bold tracking-tighter leading-none", inverse ? "text-black" : "text-white")}>
                    ${monthlyPrice}
                  </span>
                  <span className={twMerge("text-lg font-medium", inverse ? "text-black/50" : "text-white/50")}>
                    /month
                  </span>
                </div>
                <a
                  href={buttonLink}
                  className={twMerge(
                    "btn w-full mt-8 py-3 rounded-lg font-semibold transition-all duration-300 text-center",
                    inverse
                      ? "bg-black text-white hover:bg-black/90"
                      : "bg-white text-black hover:bg-white/90"
                  )}
                >
                  {buttonText}
                </a>
                <ul className="flex flex-col gap-4 mt-8">
                  {features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="text-sm flex items-center gap-3"
                    >
                      <CheckIcon
                        className={twMerge(
                          "h-5 w-5",
                          inverse ? "text-black" : "text-white"
                        )}
                      />
                      <span className={inverse ? "text-black" : "text-white"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};