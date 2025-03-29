"use client";

import { Header } from "../../sections/Header";
import { Footer } from "../../sections/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import DigitalMarketingImage from "../../assets/marketing.png";

export default function DigitalMarketing() {
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
              Digital Marketing Services
            </motion.h1>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/80 text-center mb-8"
            >
              At <span className="text-[#317e31] font-semibold">Sahil DigiEra</span>, we help businesses grow with strategic digital marketing solutions.
            </motion.p>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center mb-8"
            >
              <Image
                src={DigitalMarketingImage}
                alt="Digital Marketing"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Services List */}
            <div className="space-y-6">
              {/* Social Media Marketing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-semibold text-[#317e31] mb-3">
                  Social Media Marketing
                </h2>
                <p className="text-white/80">
                  We create and manage engaging social media campaigns to enhance your brand presence and connect with your audience.
                </p>
              </motion.div>

              {/* Pay-Per-Click (PPC) Advertising */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-semibold text-[#317e31] mb-3">
                  Pay-Per-Click (PPC) Advertising
                </h2>
                <p className="text-white/80">
                  Our targeted PPC strategies drive high-quality traffic to your website, ensuring maximum ROI on your ad spend.
                </p>
              </motion.div>

              {/* Content Marketing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-semibold text-[#317e31] mb-3">
                  Content Marketing
                </h2>
                <p className="text-white/80">
                  We craft compelling content that attracts, informs, and converts your audience into loyal customers.
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