"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "../../sections/Header";
import { Footer } from "../../sections/Footer";
import { useParams } from "next/navigation";

const CaseStudyPage = () => {
  const { id } = useParams();
  
  // In a real app, you'd fetch this data based on the ID
  const caseStudies = {
    "luxury-fashion-platform": {
      title: "Luxury Fashion Platform",
      description: "Shopify Plus solution with 3D product visualization",
      category: "E-Commerce",
      results: [
        "42% increase in conversion rate",
        "68% faster page loads",
        "35% higher average order value"
      ],
      challenge: "The client needed a high-performance e-commerce platform that could showcase luxury products with rich media while maintaining fast load times.",
      solution: "We built a custom Shopify Plus store with 3D product visualization, optimized media delivery through Cloudinary, and implemented a progressive loading strategy.",
      technologies: ["Shopify Plus", "React", "Three.js", "Cloudinary"],
      coverImage: "/case-studies/fashion.jpg",
      stats: [
        { value: "42%", label: "Conversion Increase" },
        { value: "1.2s", label: "Avg. Load Time" },
        { value: "$350", label: "Avg. Order Value" }
      ]
    },
    "ai-analytics-dashboard": {
      title: "AI-Powered Analytics Dashboard",
      description: "Next.js application with real-time data visualization",
      category: "Web Application",
      results: [
        "78% faster data processing",
        "92% user satisfaction",
        "60% reduction in server costs"
      ],
      challenge: "The client struggled with slow data processing and poor visualization of complex analytics.",
      solution: "We developed a Next.js application with WebAssembly-powered data processing and custom D3.js visualizations.",
      technologies: ["Next.js", "Node.js", "WebAssembly", "D3.js"],
      coverImage: "/case-studies/analytics.jpg",
      stats: [
        { value: "78%", label: "Faster Processing" },
        { value: "92%", label: "User Satisfaction" },
        { value: "60%", label: "Cost Reduction" }
      ]
    },
    "healthcare-portal": {
      title: "Healthcare Patient Portal",
      description: "Secure HIPAA-compliant platform serving 50,000+ patients",
      category: "Healthcare Tech",
      results: [
        "99.9% uptime",
        "40% faster appointment booking",
        "50% reduction in support tickets"
      ],
      challenge: "A healthcare provider needed a secure, reliable patient portal that could handle sensitive data.",
      solution: "We built a HIPAA-compliant platform with end-to-end encryption, two-factor authentication, and automated appointment scheduling.",
      technologies: ["React", "Node.js", "AWS", "PostgreSQL"],
      coverImage: "/case-studies/healthcare.jpg",
      stats: [
        { value: "99.9%", label: "Uptime" },
        { value: "40%", label: "Faster Booking" },
        { value: "50%", label: "Fewer Tickets" }
      ]
    }
  };

  const study = caseStudies[id as string] || caseStudies["luxury-fashion-platform"];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${study.coverImage})`,
                filter: "blur(20px)"
              }}
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
                {study.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {study.title}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {study.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 bg-gradient-to-b from-black to-[#0a2009]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">The Challenge</h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {study.challenge}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">Our Solution</h2>
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    {study.solution}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {study.technologies.map((tech, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                        <span className="text-white font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6">The Results</h2>
                  <ul className="space-y-4">
                    {study.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#50a826] mr-3 mt-1">✓</span>
                        <span className="text-white/80 text-lg">{result}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Key Metrics</h3>
                  <div className="space-y-6">
                    {study.stats.map((stat, index) => (
                      <div key={index}>
                        <div className="text-3xl font-bold text-[#50a826]">{stat.value}</div>
                        <div className="text-white/60">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Have a similar project?</h3>
                  <p className="text-white/60 mb-6">Let's discuss how we can help you achieve remarkable results.</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium shadow-lg shadow-[#317e31]/30 hover:shadow-[#50a826]/40 transition-all w-full text-center"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* More Case Studies */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Explore More Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(caseStudies)
                .filter(([key]) => key !== id)
                .map(([key, study], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link href={`/case-studies/${key}`}>
                      <div className="relative overflow-hidden rounded-xl h-64">
                        <div 
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                          style={{ 
                            backgroundImage: `url(${study.coverImage})`,
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
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyPage;