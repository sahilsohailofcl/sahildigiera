"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { JSX, SVGProps, useEffect, useState } from "react";

// Inline SVG component instead of importing
const ArrowRight = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      d="M5 12H19M19 12L12 5M19 12L12 19" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Helper function for placeholder images
const getImageSrc = (imagePath: string) => {
  if (!imagePath || typeof imagePath !== 'string') {
    return 'https://placehold.co/600x400/317e31/FFFFFF?text=Case+Study';
  }
  return imagePath;
};

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  metrics: Array<{ value: string; label: string }>;
  category: string;
}

export const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/case-studies?limit=3');
        if (!response.ok) {
          throw new Error('Failed to fetch case studies');
        }
        const data = await response.json();
        
        const formattedData = data.map((study: any) => {
          // Handle metrics transformation
          let metrics: Array<{ value: string; label: string }> = [];
          
          if (Array.isArray(study.stats)) {
            metrics = study.stats;
          } else if (study.metrics && typeof study.metrics === 'object') {
            metrics = Object.entries(study.metrics).map(([label, value]) => ({
              label,
              value: String(value)
            }));
          }

          // Ensure coverImage is a valid string
          const coverImage = typeof study.coverImage === 'string' 
            ? study.coverImage 
            : null;

          return {
            id: study.id || `case-study-${Math.random().toString(36).substr(2, 9)}`,
            title: study.title || "Untitled Case Study",
            description: study.description || "No description available",
            coverImage: coverImage,
            metrics,
            category: study.category || "Case Study"
          };
        });
        
        setCaseStudies(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error("Error fetching case studies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container text-center">
          <p className="text-white/60">Loading case studies...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container text-center">
          <p className="text-red-500">Error loading case studies: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
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
            className="absolute rounded-full w-64 h-64 blur-3xl"
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
            Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
              Proven
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
              Results
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Explore how we've helped businesses achieve remarkable digital growth.
          </p>
        </motion.div>

        {caseStudies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-[#317e31]/50 transition-all"
                  style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)" }}
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden">
                    {caseStudy.coverImage ? (
                      <Image
                        src={getImageSrc(caseStudy.coverImage)}
                        alt={caseStudy.title || "Case study"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#317e31] text-white text-xs font-medium">
                      {caseStudy.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{caseStudy.title}</h3>
                    <p className="text-white/70 mb-6">{caseStudy.description}</p>
                    
                    {/* Metrics */}
                    {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {caseStudy.metrics.slice(0, 3).map((metric, i) => (
                          <div key={i} className="text-center">
                            <div className="text-2xl font-bold text-[#50a826]">{metric.value}</div>
                            <div className="text-xs text-white/60 uppercase tracking-wider">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <motion.a
                      href={`/case-studies/${caseStudy.id}`}
                      className="flex items-center gap-2 text-[#50a826] font-medium group-hover:text-[#317e31] transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </motion.a>
                  </div>
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
              <motion.a
                href="/case-studies"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-transparent border border-[#317e31] text-[#50a826] font-medium hover:bg-[#317e31]/10 transition-all"
              >
                View All Case Studies
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/60">No case studies available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};