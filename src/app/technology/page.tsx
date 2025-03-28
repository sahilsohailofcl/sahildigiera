"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { LogoTicker } from "../../components/LogoTicker";
import { TechStack } from "../../components/TechStack";

const TechnologyPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Tech capabilities data
  const capabilities = [
    {
      title: "Web Development",
      description: "Building performant, scalable web applications with modern frameworks.",
      icon: "💻",
      features: [
        "Custom React/Next.js applications",
        "Serverless architecture",
        "Headless CMS integration",
        "Progressive Web Apps"
      ]
    },
    {
      title: "E-Commerce",
      description: "Creating seamless shopping experiences that convert.",
      icon: "🛒",
      features: [
        "Shopify Plus development",
        "Custom checkout experiences",
        "Payment gateway integration",
        "Inventory management systems"
      ]
    },
    {
      title: "Digital Marketing",
      description: "Data-driven strategies to grow your business online.",
      icon: "📈",
      features: [
        "PPC campaign management",
        "SEO optimization",
        "Conversion rate optimization",
        "Marketing automation"
      ]
    }
  ];

  // Background animation setup
  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    // Cleanup function for any potential event listeners
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main ref={sectionRef}>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-24">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[...Array(8)].map((_, i) => (
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
                  i % 2 === 0 ? "w-48 h-48 blur-xl" : 
                  "w-32 h-32 blur-lg"
                } bg-[#317e31]`}
                style={{
                  top: `${10 + (i * 10) % 80}%`,
                  left: `${10 + (i * 15) % 80}%`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
                Technical Excellence
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Our Technology
                </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
                  Capabilities
                </span>
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                We combine cutting-edge technology with creative solutions to build digital experiences that drive results.
              </p>
            </motion.div>

            {/* Tech capabilities cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:border-[#317e31]/50 transition-all group"
                >
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {capability.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {capability.title}
                  </h3>
                  <p className="text-white/70 mb-6">
                    {capability.description}
                  </p>
                  <ul className="space-y-3">
                    {capability.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#50a826] mr-2">✓</span>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrated LogoTicker component */}
        <LogoTicker />

        {/* Case Studies Section */}
        <section className="py-24 bg-gradient-to-b from-black to-[#0a2009]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
                Success Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Technology in
                </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
                  Action
                </span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                See how we've leveraged our technical expertise to solve real business challenges.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Case Study 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-[#317e31]/50 transition-all min-h-[400px]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <div className="absolute inset-0 bg-[#317e31]/10" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#50a826]" />
                    <span className="text-xs font-medium text-[#50a826]">
                      E-Commerce
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Luxury Fashion Platform
                  </h3>
                  <p className="text-white/80 mb-4">
                    Built a custom Shopify Plus solution with 3D product visualization.
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
              </motion.div>

              {/* Case Study 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-[#317e31]/50 transition-all min-h-[400px]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <div className="absolute inset-0 bg-[#317e31]/10" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#50a826]" />
                    <span className="text-xs font-medium text-[#50a826]">
                      Web Application
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    AI-Powered Analytics Dashboard
                  </h3>
                  <p className="text-white/80 mb-4">
                    Developed a Next.js application with real-time data visualization.
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
              </motion.div>
            </div>
          </div>
        </section>

        {/* Integrated TechStack component */}
        <TechStack />

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-[#0a2009] to-black">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to build something amazing?
              </h2>
              <p className="text-xl text-white/60 mb-8">
                Let's discuss how we can leverage technology to solve your business challenges.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium shadow-lg shadow-[#317e31]/30 hover:shadow-[#50a826]/40 transition-all"
                >
                  Get in Touch
                </motion.a>
                <motion.a
                  href="/portfolio"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/5 text-white font-medium border border-white/10 hover:border-[#317e31]/50 hover:bg-white/10 transition-all"
                >
                  View Our Work
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TechnologyPage;