"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-black px-4 py-20">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzE3ZTMxIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzE3ZTMxIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-50"
        ></motion.div>
      </div>

      {/* Floating organic shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 overflow-hidden"
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100 * Math.sin(i * 0.5), -50 * Math.cos(i * 0.3)],
              y: [0, 100 * Math.cos(i * 0.7), -50 * Math.sin(i * 0.2)],
              rotate: [0, 180 * (i % 2 === 0 ? 1 : -1)],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className={`absolute ${
              i % 3 === 0
                ? "w-32 h-32 rounded-full blur-xl"
                : i % 2 === 0
                ? "w-24 h-24 rotate-45 blur-lg"
                : "w-16 h-16 rounded-lg blur-md"
            } bg-[#317e31] opacity-50`}
            style={{
              top: `${10 + (i * 7) % 80}%`,
              left: `${10 + (i * 10) % 80}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 overflow-hidden"
        >
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="block text-sm font-semibold uppercase tracking-[0.3em] text-[#317e31]"
          >
            Digital Innovation Studio
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-8 text-5xl font-bold leading-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <motion.span
            className="block bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            Empowering
          </motion.span>
          <motion.span
            className="block bg-gradient-to-r from-[#317e31] to-[#50a826] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Digital Excellence
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
        >
          We craft transformative digital experiences that elevate brands and
          drive measurable results through cutting-edge marketing and
          development solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(49, 126, 49, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/contact")}
            className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] px-8 py-4 font-medium text-white shadow-lg transition-all"
          >
            <motion.span 
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
            >
              Start Your Project
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-r from-[#317e31] via-[#50a826] to-[#317e31] opacity-0"
              whileHover={{
                opacity: 1,
                backgroundPosition: ["0% 50%", "100% 50%"],
                transition: { duration: 1.5 }
              }}
            />
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(49, 126, 49, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/about")}
            className="group flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/50 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all hover:border-[#317e31]/30 hover:bg-[#317e31]/10"
          >
            <span>Explore Our Work</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Animated connection lines */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M10,100 Q500,50 990,100"
          stroke="#317e31"
          strokeWidth="1"
          fill="none"
          strokeDasharray="10 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 3, delay: 1.5 }}
        />
        <motion.path
          d="M1000,50 Q500,150 0,50"
          stroke="#317e31"
          strokeWidth="1"
          fill="none"
          strokeDasharray="15 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 3, delay: 1.8 }}
        />
      </motion.svg>
    </section>
  );
};