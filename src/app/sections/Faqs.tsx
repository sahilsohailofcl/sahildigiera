"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ChevronDown from "../assets/ChevronDown.svg";
import ChevronUp from "../assets/ChevronUp.svg";


export const FAQS = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does Sahil DigiEra offer?",
      answer: "We provide comprehensive digital solutions including web development, SEO, social media marketing, content creation, PPC advertising, and branding services tailored to your business needs."
    },
    {
      question: "How long does it take to see results from SEO?",
      answer: "SEO is a long-term strategy. Typically, you'll start seeing initial results in 3-6 months, with significant improvements appearing after 6-12 months of consistent optimization."
    },
    {
      question: "Do you offer ongoing website maintenance?",
      answer: "Yes, we provide monthly maintenance packages that include security updates, performance optimization, content updates, and technical support to keep your website running smoothly."
    },
    {
      question: "What makes your digital marketing approach different?",
      answer: "We combine data-driven strategies with creative execution, focusing on measurable ROI. Our team stays updated with the latest algorithms and trends to ensure your campaigns remain effective."
    },
    {
      question: "Can you work with my existing website?",
      answer: "Absolutely! We can audit, optimize, and enhance your current website or completely redesign it based on your goals and our recommendations."
    },
    {
      question: "How do you measure campaign success?",
      answer: "We establish clear KPIs upfront and provide detailed monthly reports tracking metrics like traffic, conversions, engagement rates, and ROI using tools like Google Analytics and our proprietary dashboards."
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
            FAQs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
              Frequently Asked
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
              Questions
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Find answers to common questions about our services and processes.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4 last:mb-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-6 rounded-xl flex justify-between items-center transition-all ${activeIndex === index ? 'bg-white/5 border border-[#317e31]/50' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}
              >
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#50a826]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/60" />
                )}
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-2 text-white/70">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-6">Still have questions?</p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium shadow-lg shadow-[#317e31]/30 hover:shadow-[#50a826]/40 transition-all"
          >
            Contact Our Team
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};