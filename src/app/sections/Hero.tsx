"use client";

import Image from "next/image";
import ArrowIcon from "../assets/arrow-right.svg";
import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import YourPhoto from "../assets/hero-image.png";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const heroref = useRef(null);
  const router = useRouter();

  return (
    <section
      ref={heroref}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#50a826,#000_100%)] overflow-x-clip flex justify-center items-center min-h-[80vh]"
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Column */}
          <div className="md:w-1/2 text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white/90 to-[#317e31] text-transparent bg-clip-text mt-6"
            >
              <span className="block">Empowering Ideas</span>
              <span className="block">Delivering Excellence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/60 tracking-tight mt-6"
            >
              Your trusted partner for cutting-edge digital marketing and web
              development solutions. Let&#39;s build something extraordinary
              together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4 items-center mt-8"
            >
              <button
                onClick={() => router.push("/contact")}
                className="px-6 py-3 bg-[#000] text-white font-semibold rounded-lg transition-all duration-300"
              >
                Get a Quote
              </button>

              <Link href="/about" passHref>
                <button className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowIcon className="h-5 w-5" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Photo Column - Floating Animation */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, y: 50 }} // Slide in from the bottom
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="w-full max-w-[600px] md:max-w-[800px] h-auto"
              animate={{ translateY: [-30, 30] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            >
              <Image
                src={YourPhoto}
                alt="Hero Image"
                className="w-full h-auto md:w-[120%]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};