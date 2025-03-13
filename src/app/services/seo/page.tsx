"use client";

import { Header } from "../../sections/Header";
import { Footer } from "../../sections/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import SeoImage from "../../assets/seo.png";

export default function SeoOptimization() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
        {/* Glass Morphism Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl p-8 rounded-2xl shadow-lg backdrop-blur-md bg-white/5 border border-white/10 relative overflow-hidden"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(49,126,49,0.2)_0%,_transparent_70%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,224,99,0.1)_0%,_transparent_70%)] animate-pulse delay-1000"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-b from-white/90 to-[#317e31] text-transparent bg-clip-text"
            >
              SEO Optimization Services
            </motion.h1>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/80 text-center mb-8"
            >
              At <span className="text-[#317e31] font-semibold">Sahil DigiEra</span>, we enhance your online presence with cutting-edge SEO strategies.
            </motion.p>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center mb-8"
            >
              <Image
                src={SeoImage}
                alt="SEO Optimization"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Services List */}
            <div className="space-y-6">
              {/* On-Page SEO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-semibold text-[#317e31] mb-3">
                  On-Page SEO
                </h2>
                <p className="text-white/80">
                  We optimize your website’s structure, content, and meta tags to improve search engine rankings and user experience.
                </p>
              </motion.div>

              {/* Off-Page SEO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-semibold text-[#317e31] mb-3">
                  Off-Page SEO
                </h2>
                <p className="text-white/80">
                  Our team builds high-quality backlinks and promotes your website across various platforms to increase domain authority.
                </p>
              </motion.div>

              {/* Technical SEO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-semibold text-[#317e31] mb-3">
                  Technical SEO
                </h2>
                <p className="text-white/80">
                  We ensure your site is technically optimized for search engines by improving speed, security, and mobile-friendliness.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}