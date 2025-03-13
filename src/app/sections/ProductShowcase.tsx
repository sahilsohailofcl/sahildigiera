"use client";
import ProductImage from "../assets/product-image.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ProductShowcase = () => {

  const sectionRef = useRef(null);

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <>
      <section ref={sectionRef} className="bg-gradient-to-b from-[#000] to-[#50a826] py-24 overflow-x-clip">
        <div className="container">
          <div className="section-heading">
            <div className="flex justify-center items-center">
              <div className="tag text-white/80">Your Growth, Our Mission</div>
            </div>
            <h2 className="section-title mt-5">
              Build, Optimize, and Dominate
            </h2>
            <p className="section-description mt-5 text-white/60">
              We create high-performing websites, craft SEO strategies that rank, and run digital campaigns that convert. Let&#39;s turn your vision into measurable success.
            </p>
          </div>
          <div className="relative flex justify-center item-center">
            <Image 
              src={ProductImage} 
              alt="Digital Solutions Image" 
              className="mt-10"
            />
          </div>
        </div>
      </section>
    </>
  );
};