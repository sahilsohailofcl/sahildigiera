"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ArrowRight from "../assets/arrow-right.svg";
import CaseStudy1 from "../assets/product-image.png";
import CaseStudy2 from "../assets/product-image.png";
import CaseStudy3 from "../assets/product-image.png";

export const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "E-commerce Transformation",
      description: "Revamped online store with improved UX and performance optimization",
      image: CaseStudy1,
      metrics: [
        { value: "320%", label: "Revenue Increase" },
        { value: "4.8s → 1.2s", label: "Load Time" },
        { value: "65%", label: "Conversion Lift" }
      ],
      category: "Web Development",
      link: "/case-studies/ecommerce"
    },
    {
      id: 2,
      title: "SEO Dominance",
      description: "Comprehensive SEO strategy for competitive finance niche",
      image: CaseStudy2,
      metrics: [
        { value: "#1", label: "Google Ranking" },
        { value: "890%", label: "Organic Traffic" },
        { value: "120+", label: "Top 10 Keywords" }
      ],
      category: "SEO Optimization",
      link: "/case-studies/seo"
    },
    {
      id: 3,
      title: "Social Media Growth",
      description: "360° social media campaign for lifestyle brand",
      image: CaseStudy3,
      metrics: [
        { value: "10M+", label: "Impressions" },
        { value: "400%", label: "Engagement" },
        { value: "25K", label: "New Followers" }
      ],
      category: "Digital Marketing",
      link: "/case-studies/social-media"
    }
  ];

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
            Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
              Proven
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
              Results
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Explore how we've helped businesses achieve remarkable digital growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-[#317e31]/50 transition-all"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)" }}
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#317e31] text-white text-xs font-medium">
                  {caseStudy.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{caseStudy.title}</h3>
                <p className="text-white/70 mb-6">{caseStudy.description}</p>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {caseStudy.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-[#50a826]">{metric.value}</div>
                      <div className="text-xs text-white/60 uppercase tracking-wider">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.a
                  href={caseStudy.link}
                  className="flex items-center gap-2 text-[#50a826] font-medium group-hover:text-[#317e31] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
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
          <motion.a
            href="/case-studies"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-transparent border border-[#317e31] text-[#50a826] font-medium hover:bg-[#317e31]/10 transition-all"
          >
            View All Case Studies
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};