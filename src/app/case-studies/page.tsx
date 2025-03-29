"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";

const CaseStudiesPage = () => {
  const caseStudies = [
    {
      id: "luxury-fashion-platform",
      title: "Luxury Fashion Platform",
      description: "Shopify Plus solution with 3D product visualization that increased conversions by 42%",
      category: "E-Commerce",
      results: [
        "42% increase in conversion rate",
        "68% faster page loads",
        "35% higher average order value"
      ],
      coverImage: "/case-studies/fashion.jpg"
    },
    {
      id: "ai-analytics-dashboard",
      title: "AI-Powered Analytics Dashboard",
      description: "Next.js application that reduced data processing time by 78%",
      category: "Web Application",
      results: [
        "78% faster data processing",
        "92% user satisfaction",
        "60% reduction in server costs"
      ],
      coverImage: "/case-studies/analytics.jpg"
    },
    {
      id: "healthcare-portal",
      title: "Healthcare Patient Portal",
      description: "Secure HIPAA-compliant platform serving 50,000+ patients",
      category: "Healthcare Tech",
      results: [
        "99.9% uptime",
        "40% faster appointment booking",
        "50% reduction in support tickets"
      ],
      coverImage: "/case-studies/healthcare.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
                Our Work
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Case
                </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
                  Studies
                </span>
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Explore how we've helped businesses achieve remarkable results through technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12 bg-gradient-to-b from-black to-[#0a2009]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={`/case-studies/${study.id}`}>
                    <div className="relative overflow-hidden rounded-xl h-80">
                      {/* Placeholder for image - replace with your actual images */}
                      <div 
                        className="absolute inset-0 bg-gray-800 group-hover:opacity-90 transition-opacity"
                        style={{ 
                          backgroundImage: `url(${study.coverImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30" />
                      </div>
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-[#50a826]" />
                          <span className="text-xs font-medium text-[#50a826]">
                            {study.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {study.title}
                        </h3>
                        <p className="text-white/80 mb-4 line-clamp-2">
                          {study.description}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm text-[#50a826] font-medium">
                          View Case Study
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help your business grow with technology.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium shadow-lg shadow-[#317e31]/30 hover:shadow-[#50a826]/40 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;