"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import Link from "next/link";
import Image from "next/image";

// Import all logos
import GoogleLogo from "../../app/assets/Google.png";
import FramerLogo from "../../app/assets/Framer.png";
import WebFlowLogo from "../../app/assets/WebFlow.webp";
import OpenAiLogo from "../../app/assets/OpenAi.png";
import AdobeLogo from "../../app/assets/Adobe.png";
import MernLogo from "../../app/assets/Mern.png";
import ReactLogo from "../../app/assets/ReactJS.png";
import NextLogo from "../../app/assets/NextJS.png";
import NodeLogo from "../../app/assets/NodeJS.png";
import MongoLogo from "../../app/assets/MongoDB.png";
import ShopifyLogo from "../../app/assets/Shopify.png";
import WebflowLogo from "../../app/assets/WebFlow.png";
import FigmaLogo from "../../app/assets/Figma.webp";
import GoogleAdsLogo from "../../app/assets/Google-Ads.png";
import MetaAdsLogo from "../../app/assets/Meta-Ads.png";
import AhrefsLogo from "../../app/assets/Ahrefs.png";

const TechnologyPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Tech capabilities data
  const capabilities = [
    {
      title: "Web Development",
      slug: "web-development",
      description: "We build performant, scalable web applications that drive business growth through:",
      icon: "💻",
      features: [
        "Custom React/Next.js applications",
        "Serverless architecture",
        "Headless CMS integration",
        "Progressive Web Apps"
      ],
      stats: [
        { value: "3.2s", label: "Avg. page load time" },
        { value: "98%", label: "Client satisfaction" },
        { value: "50+", label: "Projects delivered" }
      ]
    },
    {
      title: "E-Commerce",
      slug: "e-commerce",
      description: "We create seamless shopping experiences that convert with:",
      icon: "🛒",
      features: [
        "Shopify Plus development",
        "Custom checkout experiences",
        "Payment gateway integration",
        "Inventory management systems"
      ],
      stats: [
        { value: "35%", label: "Avg. conversion lift" },
        { value: "2.1x", label: "ROI improvement" },
        { value: "24/7", label: "Support available" }
      ]
    },
    {
      title: "Digital Marketing",
      slug: "digital-marketing",
      description: "Data-driven strategies to grow your business online through:",
      icon: "📈",
      features: [
        "PPC campaign management",
        "SEO optimization",
        "Conversion rate optimization",
        "Marketing automation"
      ],
      stats: [
        { value: "300%", label: "Traffic growth" },
        { value: "1.8s", label: "Avg. TTFB" },
        { value: "95%", label: "Uptime guarantee" }
      ]
    }
  ];

  const techStack = [
    { src: GoogleLogo, alt: "Google", category: "Platform" },
    { src: FramerLogo, alt: "Framer", category: "Design" },
    { src: WebFlowLogo, alt: "WebFlow", category: "Development" },
    { src: OpenAiLogo, alt: "OpenAI", category: "AI" },
    { src: AdobeLogo, alt: "Adobe", category: "Creative" },
    { src: MernLogo, alt: "MERN Stack", category: "Fullstack" },
  ];

  const techCategories = [
    {
      title: "Development",
      items: [
        { name: "React", logo: ReactLogo, proficiency: "Expert" },
        { name: "Next.js", logo: NextLogo, proficiency: "Expert" },
        { name: "Node.js", logo: NodeLogo, proficiency: "Advanced" },
        { name: "MongoDB", logo: MongoLogo, proficiency: "Advanced" }
      ]
    },
    {
      title: "Platforms",
      items: [
        { name: "Shopify", logo: ShopifyLogo, proficiency: "Certified" },
        { name: "Webflow", logo: WebflowLogo, proficiency: "Expert" }
      ]
    },
    {
      title: "Design & Marketing",
      items: [
        { name: "Figma", logo: FigmaLogo, proficiency: "Expert" },
        { name: "Google Ads", logo: GoogleAdsLogo, proficiency: "Certified" },
        { name: "Meta Ads", logo: MetaAdsLogo, proficiency: "Certified" },
        { name: "Ahrefs", logo: AhrefsLogo, proficiency: "Advanced" }
      ]
    }
  ];

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main ref={sectionRef}>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-24">
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
                  Expertise
                </span>
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                We combine cutting-edge technology with proven methodologies to deliver digital experiences that drive measurable business results.
              </p>
            </motion.div>

            {/* Tech capabilities cards - Enhanced Version */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:border-[#317e31]/50 transition-all group relative"
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
                  <ul className="space-y-3 mb-8">
                    {capability.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#50a826] mr-2">✓</span>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {capability.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-bold text-[#50a826]">{stat.value}</div>
                        <div className="text-xs text-white/60">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/services/${capability.slug}`}
                    className="absolute bottom-6 left-8"
                  >
                    <motion.div
                      className="flex items-center gap-1 text-[#50a826] font-medium hover:text-[#317e31] transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Learn more
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
                        className="ml-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By Section (Former LogoTicker) */}
        <section className="py-16 md:py-24 bg-black/80 relative overflow-hidden border-t border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Trusted By Industry Leaders
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                We partner with the best technology platforms to deliver exceptional results
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all h-24"
                >
                  <Image 
                    src={tech.src} 
                    alt={tech.alt}
                    className="object-contain h-full w-full opacity-80 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section - Enhanced */}
        <section className="py-24 bg-gradient-to-b from-black to-[#0a2009]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our Technology Stack
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                We work with industry-leading tools and platforms to deliver exceptional results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {techCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-[#317e31]/50 transition-all"
                >
                  <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-white/10">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {category.items.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        whileHover={{ y: -5 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src={tech.logo}
                            alt={tech.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="text-white font-medium">{tech.name}</div>
                          <div 
                            className="text-xs mt-1"
                            style={{
                              color: tech.proficiency === "Expert" ? "#50a826" : 
                                     tech.proficiency === "Certified" ? "#317e31" : 
                                     "#bcbcbc"
                            }}
                          >
                            {tech.proficiency}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-white/60 mb-6">Have specific technology requirements?</p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium shadow-lg shadow-[#317e31]/30 hover:shadow-[#50a826]/40 transition-all"
              >
                Discuss Your Project
              </Link>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Technology in Action
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                See how we've leveraged our technical expertise to solve real business challenges
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    Built a custom Shopify Plus solution with 3D product visualization that increased conversions by 42%.
                  </p>
                  <Link href="/case-studies/ecommerce" className="inline-flex items-center gap-1 text-sm text-[#50a826] font-medium">
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
                  </Link>
                </div>
              </motion.div>

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
                    Developed a Next.js application that reduced data processing time by 78%.
                  </p>
                  <Link href="/case-studies/analytics" className="inline-flex items-center gap-1 text-sm text-[#50a826] font-medium">
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
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-[#0a2009] to-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can leverage technology to solve your business challenges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium shadow-lg shadow-[#317e31]/30 hover:shadow-[#50a826]/40 transition-all"
              >
                Get in Touch
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/5 text-white font-medium border border-white/10 hover:border-[#317e31]/50 hover:bg-white/10 transition-all"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TechnologyPage;