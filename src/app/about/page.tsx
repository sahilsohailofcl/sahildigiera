"use client";

import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import AboutImage from "../assets/about.png";

export default function About() {
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
              About Sahil DigiEra
            </motion.h1>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center mb-8"
            >
              <Image
                src={AboutImage}
                alt="About Sahil DigiEra"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-white/80 text-center mb-8"
            >
              Welcome to <span className="text-[#317e31] font-semibold">Sahil DigiEra</span>, your trusted partner in digital transformation. 
              We specialize in cutting-edge web development, digital marketing, and software solutions to help businesses thrive in the online world.
            </motion.p>

            {/* Mission Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#317e31] mb-4">
                Our Mission
              </h2>
              <p className="text-white/80">
                At Sahil DigiEra, our mission is to empower businesses with innovative and scalable digital solutions. 
                We strive to deliver excellence in every project, helping our clients achieve their goals and stand out in the digital landscape.
              </p>
            </motion.div>

            {/* Why Choose Us Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#317e31] mb-4">
                Why Choose Us?
              </h2>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Expertise in modern web technologies and frameworks</li>
                <li>Customized solutions tailored to your unique needs</li>
                <li>Commitment to innovation, quality, and timely delivery</li>
                <li>Client-first approach with transparent communication</li>
                <li>Proven track record of successful projects</li>
              </ul>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center"
            >
              <p className="text-white/80 mb-4">
                Ready to transform your business? Let’s build something extraordinary together.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-[#317e31] hover:bg-[#2a6c2a] text-white font-semibold rounded-lg transition-all duration-300"
              >
                Get Started Today
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}