"use client";

import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Services() {
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
              Our Services
            </motion.h1>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/80 text-center mb-8"
            >
              At <span className="text-[#317e31] font-semibold">Sahil DigiEra</span>, we offer a range of top-notch digital services to help your business thrive online.
            </motion.p>

            {/* Services List */}
            <div className="space-y-6">
              {/* Web Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-semibold text-[#317e31] mb-3">
                  Web Development
                </h2>
                <p className="text-white/80 mb-4">
                  We create stunning, responsive, and high-performance websites tailored to your business needs.
                </p>
                <Link href="/services/web-development">
                  <button className="px-4 py-2 bg-[#317e31] hover:bg-[#2a6c2a] text-white font-semibold rounded-lg transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </motion.div>

              {/* SEO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-semibold text-[#317e31] mb-3">
                  SEO (Search Engine Optimization)
                </h2>
                <p className="text-white/80 mb-4">
                  Our SEO strategies ensure higher rankings, increased traffic, and better visibility on search engines.
                </p>
                <Link href="/services/seo">
                  <button className="px-4 py-2 bg-[#317e31] hover:bg-[#2a6c2a] text-white font-semibold rounded-lg transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </motion.div>

              {/* Digital Marketing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-semibold text-[#317e31] mb-3">
                  Digital Marketing
                </h2>
                <p className="text-white/80 mb-4">
                  We drive engagement and conversions with data-driven digital marketing campaigns.
                </p>
                <Link href="/services/digital-marketing">
                  <button className="px-4 py-2 bg-[#317e31] hover:bg-[#2a6c2a] text-white font-semibold rounded-lg transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}