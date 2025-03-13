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

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <>
      <section ref={sectionRef} className="bg-gradient-to-b from-black to-[#317e31] py-24 overflow-x-clip">
        <div className="container">
          <div className="section-heading relative text-center">
            <h2 className="section-title text-4xl md:text-5xl font-bold bg-gradient-to-b from-white/90 to-[#317e31] text-transparent bg-clip-text">
              Let&#39;s Build Something Extraordinary
            </h2>
            <p className="section-description mt-5 text-white/60 max-w-2xl mx-auto">
              Ready to take your business to the next level? Schedule a meeting with us today and let&#39;s discuss how we can help you achieve your goals.
            </p>
          </div>
          <div className="flex gap-4 mt-10 justify-center items-center">
            <button
              onClick={() => router.push("https://calendly.com/sahildigiera")}
              className="px-6 py-3 bg-[#000] text-white font-semibold rounded-lg"
            >
              Schedule a Meeting
            </button>
            <Link href="/contact" passHref>
              <button className="flex items-center gap-2 px-6 py-3 text-white/80 hover:text-white transition-all duration-300">
                <span>Contact Us</span>
                <ArrowIcon className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};