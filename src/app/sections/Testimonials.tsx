"use client";
import React from "react";
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";
import avatar4 from "../assets/avatar-4.png";
import avatar5 from "../assets/avatar-5.png";
import avatar6 from "../assets/avatar-6.png";
import avatar7 from "../assets/avatar-7.png";
import avatar8 from "../assets/avatar-8.png";
import avatar9 from "../assets/avatar-9.png";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Sahil DigiEra transformed our online presence! Their web development and SEO strategies have driven incredible traffic to our site. Highly recommend!",
    imageSrc: avatar1.src,
    name: "John Doe",
  },
  {
    text: "The digital marketing team at Sahil DigiEra is phenomenal. They helped us scale our business with targeted campaigns and measurable results.",
    imageSrc: avatar2.src,
    name: "Jane Smith",
  },
  {
    text: "From strategy to execution, Sahil DigiEra delivered beyond our expectations. Their expertise in web development is unmatched!",
    imageSrc: avatar3.src,
    name: "Michael Brown",
  },
  {
    text: "Sahil DigiEra's social media marketing strategies have significantly boosted our brand visibility. Their team is creative and results-driven!",
    imageSrc: avatar4.src,
    name: "Emily Johnson",
  },
  {
    text: "We partnered with Sahil DigiEra for a complete website overhaul, and the results have been outstanding. Their attention to detail is impressive.",
    imageSrc: avatar5.src,
    name: "David Wilson",
  },
  {
    text: "The SEO services provided by Sahil DigiEra have helped us rank on the first page of Google. Their expertise is truly remarkable.",
    imageSrc: avatar6.src,
    name: "Sarah Lee",
  },
  {
    text: "Sahil DigiEra's team is professional, responsive, and highly skilled. They’ve become an integral part of our digital strategy.",
    imageSrc: avatar7.src,
    name: "Chris Evans",
  },
  {
    text: "Our e-commerce website saw a 200% increase in sales after working with Sahil DigiEra. Their solutions are game-changing!",
    imageSrc: avatar8.src,
    name: "Laura Martinez",
  },
  {
    text: "Sahil DigiEra's content marketing strategies have helped us connect with our audience in meaningful ways. Highly recommend their services!",
    imageSrc: avatar9.src,
    name: "Alex Turner",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: { className?: string; testimonials: typeof testimonials; duration?: number }) => (
  <div className={props.className}>
    <motion.div
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, imageSrc, name }, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <p className="text-white/80">{text}</p>
              <div className="flex items-center gap-3 mt-5">
                <Image
                  src={imageSrc}
                  width={40}
                  height={40}
                  alt={name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="text-white font-semibold">{name}</div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <>
      <section className="bg-black py-24">
        <div className="container">
          <div className="section-heading text-center">
            <div className="flex justify-center">
              <div className="tag text-white/80">Testimonials</div>
            </div>
            <h2 className="section-title mt-5 text-4xl md:text-5xl font-bold bg-gradient-to-b from-white/90 to-[#317e31] text-transparent bg-clip-text">
              What Our Clients Say
            </h2>
            <p className="section-description mt-5 text-white/60 max-w-2xl mx-auto">
              Hear from our satisfied clients who have experienced exceptional results with our digital marketing and web development services.
            </p>
          </div>
          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </section>
    </>
  );
};