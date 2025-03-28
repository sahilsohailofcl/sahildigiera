"use client";
import ArrowIcon from "../assets/arrow-right.svg";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-black to-[#0a2005]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100 * Math.sin(i * 0.5)],
              y: [0, 100 * Math.cos(i * 0.7)],
              rotate: [0, 180 * (i % 2 === 0 ? 1 : -1)],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className={`absolute ${
              i % 3 === 0 ? "w-32 h-32 rounded-full blur-xl" : 
              i % 2 === 0 ? "w-24 h-24 rotate-45 blur-lg" : 
              "w-16 h-16 rounded-lg blur-md"
            } bg-[#317e31] opacity-30`}
            style={{
              top: `${10 + (i * 7) % 80}%`,
              left: `${10 + (i * 10) % 80}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center"
          style={{ opacity }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-6"
          >
            Ready To Transform Your Business?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
              Let's Build
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
              Something Amazing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-white/60 max-w-3xl mx-auto mb-10"
          >
            Schedule a free consultation to discuss how we can help you achieve your digital goals and grow your business exponentially.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("https://calendly.com/sahildigiera")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium shadow-lg shadow-[#317e31]/30 hover:shadow-[#50a826]/40 transition-all"
            >
              Book Free Consultation
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Link href="/contact" passHref>
                <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-transparent border-2 border-white/10 text-white font-medium hover:border-[#317e31]/50 hover:bg-[#317e31]/10 transition-all">
                  <span>Explore Our Services</span>
                  <ArrowIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div 
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40"
          style={{ translateY }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#317e31]/30 to-transparent h-px"></div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-64 h-64 rounded-full bg-[#317e31]/10 blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
};