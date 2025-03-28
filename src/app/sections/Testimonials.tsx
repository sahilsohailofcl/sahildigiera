"use client";
import React, { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import StarIcon  from "../assets/star-icon.svg";
import QuoteIcon from "../assets/quote-icon.svg";

const testimonials = [
  {
    text: "Sahil DigiEra transformed our online presence! Their web development and SEO strategies have driven incredible traffic to our site. Highly recommend!",
    imageSrc: avatar1.src,
    name: "John Doe",
    role: "CEO, TechStart Inc",
    rating: 5,
  },
  {
    text: "The digital marketing team at Sahil DigiEra is phenomenal. They helped us scale our business with targeted campaigns and measurable results.",
    imageSrc: avatar2.src,
    name: "Jane Smith",
    role: "Marketing Director, BrandCo",
    rating: 5,
  },
  {
    text: "From strategy to execution, Sahil DigiEra delivered beyond our expectations. Their expertise in web development is unmatched!",
    imageSrc: avatar3.src,
    name: "Michael Brown",
    role: "Founder, DesignHub",
    rating: 5,
  },
  {
    text: "Sahil DigiEra's social media marketing strategies have significantly boosted our brand visibility. Their team is creative and results-driven!",
    imageSrc: avatar4.src,
    name: "Emily Johnson",
    role: "Social Media Manager, Trendsetters",
    rating: 4,
  },
  {
    text: "We partnered with Sahil DigiEra for a complete website overhaul, and the results have been outstanding. Their attention to detail is impressive.",
    imageSrc: avatar5.src,
    name: "David Wilson",
    role: "Operations Director, RetailPlus",
    rating: 5,
  },
  {
    text: "The SEO services provided by Sahil DigiEra have helped us rank on the first page of Google. Their expertise is truly remarkable.",
    imageSrc: avatar6.src,
    name: "Sarah Lee",
    role: "E-commerce Manager, ShopEasy",
    rating: 5,
  },
  {
    text: "Sahil DigiEra's team is professional, responsive, and highly skilled. They've become an integral part of our digital strategy.",
    imageSrc: avatar7.src,
    name: "Chris Evans",
    role: "CTO, InnovateTech",
    rating: 4,
  },
  {
    text: "Our e-commerce website saw a 200% increase in sales after working with Sahil DigiEra. Their solutions are game-changing!",
    imageSrc: avatar8.src,
    name: "Laura Martinez",
    role: "Owner, BoutiqueFashion",
    rating: 5,
  },
  {
    text: "Sahil DigiEra's content marketing strategies have helped us connect with our audience in meaningful ways. Highly recommend their services!",
    imageSrc: avatar9.src,
    name: "Alex Turner",
    role: "Content Director, MediaWorks",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100 * Math.sin(i * 0.5)],
              y: [0, 100 * Math.cos(i * 0.7)],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className={`absolute rounded-full w-64 h-64 blur-3xl`}
            style={{
              top: `${10 + (i * 15) % 80}%`,
              left: `${10 + (i * 20) % 80}%`,
              backgroundColor: "#317e31",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
            Client Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
              Trusted by
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
              Businesses Worldwide
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients say about working with us.
          </p>
        </motion.div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden">
          <AnimatePresence custom={direction}>
            <motion.div
              key={activeTestimonial}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.4 }}
              className="p-8 rounded-xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 mb-8"
            >
              <QuoteIcon className="w-8 h-8 text-[#50a826] mb-6" />
              <p className="text-white/80 text-lg mb-6">{testimonials[activeTestimonial].text}</p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonials[activeTestimonial].imageSrc}
                  width={56}
                  height={56}
                  alt={testimonials[activeTestimonial].name}
                  className="rounded-full"
                />
                <div>
                  <div className="text-white font-medium">{testimonials[activeTestimonial].name}</div>
                  <div className="text-white/60 text-sm">{testimonials[activeTestimonial].role}</div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${i < testimonials[activeTestimonial].rating ? 'text-[#50a826]' : 'text-white/20'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeTestimonial ? 1 : -1);
                    setActiveTestimonial(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? 'bg-[#50a826] w-4' : 'bg-white/30'}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-[#317e31]/50 transition-all group"
            >
              <QuoteIcon className="w-8 h-8 text-[#50a826] mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <p className="text-white/80 text-lg mb-6 group-hover:text-white/90 transition-colors">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={testimonial.imageSrc}
                    width={56}
                    height={56}
                    alt={testimonial.name}
                    className="rounded-full group-hover:ring-2 group-hover:ring-[#50a826] transition-all"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#317e31] rounded-full p-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium group-hover:text-[#50a826] transition-colors">
                    {testimonial.name}
                  </div>
                  <div className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                    {testimonial.role}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-[#50a826]' : 'text-white/20'} group-hover:scale-110 transition-transform`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-white/10 pt-16"
        >
          {[
            { value: "100%", label: "Client Satisfaction" },
            { value: "200+", label: "Projects Completed" },
            { value: "5x", label: "Average ROI" },
            { value: "24/7", label: "Support Available" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31] mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 uppercase text-sm tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};