"use client";
import { motion } from "framer-motion";
import CheckCircle from "../assets/check-circle.svg";
import Layout from "../assets/layout.svg";
import Design from "../assets/design.svg";
import Code from "../assets/code.svg";
import Rocket from "../assets/rocket.svg";

export const ProcessSection = () => {
  const processSteps = [
    {
      icon: <Layout className="w-6 h-6 md:w-8 md:h-8 text-[#50a826]" />,
      title: "Discovery & Planning",
      description: "We analyze your needs, define goals, and create a strategic roadmap for your project.",
      duration: "1-2 weeks"
    },
    {
      icon: <Design className="w-6 h-6 md:w-8 md:h-8 text-[#50a826]" />,
      title: "Design & Prototyping",
      description: "Our designers create wireframes and prototypes for your review and feedback.",
      duration: "2-3 weeks"
    },
    {
      icon: <Code className="w-6 h-6 md:w-8 md:h-8 text-[#50a826]" />,
      title: "Development",
      description: "We build your solution with clean, efficient code following industry best practices.",
      duration: "3-6 weeks"
    },
    {
      icon: <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-[#50a826]" />,
      title: "Testing & QA",
      description: "Rigorous testing ensures flawless performance across all devices and platforms.",
      duration: "1-2 weeks"
    },
    {
      icon: <Rocket className="w-6 h-6 md:w-8 md:h-8 text-[#50a826]" />,
      title: "Launch & Optimization",
      description: "We deploy your project and continuously monitor for peak performance.",
      duration: "Ongoing"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
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
            className={`absolute rounded-full w-32 h-32 md:w-64 md:h-64 blur-xl md:blur-3xl`}
            style={{
              top: `${10 + (i * 15) % 80}%`,
              left: `${10 + (i * 20) % 80}%`,
              backgroundColor: "#317e31",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
              Clear, Structured
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
              Workflow
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Our proven 5-phase approach ensures your project's success from concept to launch and beyond.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#317e31]/50 to-transparent -translate-x-1/2 hidden md:block"></div>

          <div className="grid gap-8 md:gap-16">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                {/* Mobile layout (always centered) */}
                <div className="md:hidden flex flex-col items-center text-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-black border-2 border-[#317e31]/50 flex items-center justify-center p-2 mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/70 mb-3 text-sm">{step.description}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#317e31]/10 text-[#50a826] text-xs">
                    {step.duration}
                  </span>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:grid grid-cols-5 gap-6 items-center">
                  {/* Left side */}
                  <div className="col-span-2 text-right">
                    {index % 2 === 0 && (
                      <div className="pr-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-white/70 mb-3">{step.description}</p>
                        <span className="inline-block px-3 py-1 rounded-full bg-[#317e31]/10 text-[#50a826] text-sm">
                          {step.duration}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Center icon */}
                  <div className="col-span-1 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-black border-2 border-[#317e31]/50 flex items-center justify-center p-2">
                      {step.icon}
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="col-span-2 text-left">
                    {index % 2 !== 0 && (
                      <div className="pl-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-white/70 mb-3">{step.description}</p>
                        <span className="inline-block px-3 py-1 rounded-full bg-[#317e31]/10 text-[#50a826] text-sm">
                          {step.duration}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-20"
        >
          <p className="text-white/60 mb-6 text-sm md:text-base">Ready to start your project?</p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium text-sm md:text-base shadow-lg shadow-[#317e31]/30 hover:shadow-[#50a826]/40 transition-all"
          >
            Get Started
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};