"use client";

import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { motion } from "framer-motion";

export default function Careers() {
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
              Join Our Team at Sahil DigiEra
            </motion.h1>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/80 text-center mb-8"
            >
              At <span className="text-[#317e31] font-semibold">Sahil DigiEra</span>, we’re always looking for passionate and talented individuals to join our growing team.
            </motion.p>

            {/* Why Work With Us Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#317e31] mb-4">
                Why Work With Us?
              </h2>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Innovative and dynamic work environment</li>
                <li>Opportunities for professional growth</li>
                <li>Competitive salaries and benefits</li>
                <li>Remote and flexible work options</li>
              </ul>
            </motion.div>

            {/* Current Openings Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#317e31] mb-4">
                Current Openings
              </h2>
              <p className="text-white/80">
                We don’t have any open positions at the moment, but stay tuned for upcoming opportunities!
              </p>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-center"
            >
              <p className="text-white/80 mb-4">
                Interested in working with us?{" "}
                <span className="font-semibold text-[#317e31]">Send us your resume</span> at{" "}
                <span className="text-[#317e31]">Hello@sahildigiera.com</span>.
              </p>
              <a
                href="mailto:hello@sahildigiera.com"
                className="inline-block px-6 py-3 bg-[#317e31] hover:bg-[#2a6c2a] text-white font-semibold rounded-lg transition-all duration-300"
              >
                Email Your Resume
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}