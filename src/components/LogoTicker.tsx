// components/LogoTicker.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// Import your logo images
import GoogleLogo from "../../src/app/assets/Google.png";
import FramerLogo from "../../src/app/assets/Framer.png";
import WebFlowLogo from "../../src/app/assets/WebFlow.png";
import OpenAiLogo from "../../src/app/assets/OpenAi.png";
import AdobeLogo from "../../src/app/assets/Adobe.png";
import MernLogo from "../../src/app/assets/Mern.png";

interface LogoTickerProps {
  isOnTechnologyPage?: boolean;
}

export const LogoTicker = ({ isOnTechnologyPage = false }: LogoTickerProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const techStack = [
    { src: GoogleLogo, alt: "Google", category: "Platform" },
    { src: FramerLogo, alt: "Framer", category: "Design" },
    { src: WebFlowLogo, alt: "WebFlow", category: "Development" },
    { src: OpenAiLogo, alt: "OpenAI", category: "AI" },
    { src: AdobeLogo, alt: "Adobe", category: "Creative" },
    { src: MernLogo, alt: "MERN Stack", category: "Fullstack" },
  ];

  return (
    <section 
      className={`py-16 md:py-24 bg-black relative overflow-hidden ${isOnTechnologyPage ? '!py-12' : ''}`}
      ref={containerRef}
    >
      {/* Animated background elements */}
      {!isOnTechnologyPage && (
        <div className="absolute inset-0 overflow-hidden opacity-5">
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
                i % 3 === 0 ? "w-32 h-32 blur-xl" : 
                i % 2 === 0 ? "w-24 h-24 blur-lg" : 
                "w-16 h-16 blur-md"
              } bg-[#317e31] opacity-20`}
              style={{
                top: `${10 + (i * 10) % 80}%`,
                left: `${10 + (i * 15) % 80}%`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container relative z-10">
        {!isOnTechnologyPage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
              Technology Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                Trusted By
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
                Industry Leaders
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              We work with the best tools and platforms to deliver exceptional results.
            </p>
          </motion.div>
        )}

        <div className="relative">
          {/* First row */}
          <motion.div
            className="flex gap-10 md:gap-16 items-center py-4"
            initial={{ x: "0%" }}
            animate={isInView ? { x: "-50%" } : {}}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...techStack, ...techStack].map((tech, index) => (
              <motion.div
                key={`first-${index}`}
                className="flex-shrink-0 group relative"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative w-32 md:w-40 h-16 flex items-center justify-center">
                  <Image 
                    src={tech.src} 
                    alt={tech.alt} 
                    fill
                    className="object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
                {!isOnTechnologyPage && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="whitespace-nowrap text-xs px-2 py-1 rounded-full bg-[#317e31]/80 text-white">
                      {tech.category}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Second row (reverse direction) */}
          <motion.div
            className="flex gap-10 md:gap-16 items-center py-4"
            initial={{ x: "-50%" }}
            animate={isInView ? { x: "0%" } : {}}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...techStack.reverse(), ...techStack].map((tech, index) => (
              <motion.div
                key={`second-${index}`}
                className="flex-shrink-0 group relative"
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative w-28 md:w-36 h-14 flex items-center justify-center">
                  <Image 
                    src={tech.src} 
                    alt={tech.alt} 
                    fill
                    className="object-contain opacity-60 group-hover:opacity-90 transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};