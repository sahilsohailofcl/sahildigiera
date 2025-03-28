// components/TechStack.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// Import your tech stack logos
import ReactLogo from "../../src/app/assets/ReactJS.png";
import NextLogo from "../../src/app/assets/NextJS.png";
import NodeLogo from "../../src/app/assets/NodeJS.png";
import MongoLogo from "../../src/app/assets/MongoDB.png";
import ShopifyLogo from "../../src/app/assets/Shopify.png";
import WebflowLogo from "../../src/app/assets/WebFlow.png";
import FigmaLogo from "../../src/app/assets/Figma.webp";
import GoogleAdsLogo from "../../src/app/assets/Google-Ads.png";
import MetaAdsLogo from "../../src/app/assets/Meta-Ads.png";
import AhrefsLogo from "../../src/app/assets/Ahrefs.png";

interface TechStackProps {
  isOnTechnologyPage?: boolean;
}

export const TechStack = ({ isOnTechnologyPage = false }: TechStackProps) => {
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

  return (
    <section className={`py-24 bg-black relative overflow-hidden ${isOnTechnologyPage ? '!py-12' : ''}`}>
      {/* Background elements */}
      {!isOnTechnologyPage && (
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
      )}

      <div className="container relative z-10">
        {!isOnTechnologyPage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
              Our Stack
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                Technology
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
                Expertise
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              We work with industry-leading tools and platforms to deliver exceptional results.
            </p>
          </motion.div>
        )}

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
      </div>
    </section>
  );
};