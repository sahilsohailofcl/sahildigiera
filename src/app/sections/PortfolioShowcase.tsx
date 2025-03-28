"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// Replace these with your actual project images
import WebProject from "../assets/product-image.png";
import DesignProject from "../assets/product-image.png";
import MarketingProject from "../assets/product-image.png";
import ArrowRight from "../assets/arrow-right.svg";

export const PortfolioShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Custom online store with 3x conversion rate",
      category: "Web Development",
      image: WebProject,
      stats: "↑ 300% Revenue",
      accentColor: "#317e31",
    },
    {
      id: 2,
      title: "Brand Identity",
      description: "Complete visual redesign for tech startup",
      category: "UI/UX Design",
      image: DesignProject,
      stats: "98% Client Satisfaction",
      accentColor: "#50a826",
    },
    {
      id: 3,
      title: "Ad Campaign",
      description: "Performance-driven social media strategy",
      category: "Digital Marketing",
      image: MarketingProject,
      stats: "↓ 40% CAC",
      accentColor: "#3a8f3a",
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 bg-black overflow-hidden"
    >
      {/* Glowing background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(9)].map((_, i) => (
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
            className={`absolute rounded-full ${
              i % 3 === 0 ? "w-64 h-64 blur-3xl" : 
              i % 2 === 0 ? "w-48 h-48 blur-2xl" : 
              "w-32 h-32 blur-xl"
            }`}
            style={{
              top: `${10 + (i * 10) % 80}%`,
              left: `${10 + (i * 12) % 80}%`,
              backgroundColor: i % 3 === 0 ? "#317e31" : 
                             i % 2 === 0 ? "#50a826" : "#3a8f3a",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
            Portfolio Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
              Crafting Digital
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
              Excellence
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            We transform visions into high-performing digital experiences that drive real business results.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-[#317e31]/50 transition-all"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)" }}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span 
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: `${project.accentColor}20`, color: project.accentColor }}
                  >
                    {project.category}
                  </span>
                  <span className="text-xs font-medium text-white/60">
                    {project.stats}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/60 mb-4">{project.description}</p>
                
                <button className="inline-flex items-center gap-2 text-[#50a826] group">
                  <span className="font-medium">View Case Study</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Hover effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${project.accentColor}10, transparent 60%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="/portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium transition-all shadow-lg shadow-[#317e31]/30 hover:shadow-[#50a826]/40"
          >
            Explore All Projects
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};