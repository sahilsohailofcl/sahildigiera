"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Header } from "../../sections/Header";
import { Footer } from "../../sections/Footer";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";

type Stat = {
  value: string;
  label: string;
};

type CaseStudy = {
  id: string;
  title: string;
  description: string;
  category: string;
  results: string[];
  challenge: string;
  solution: string;
  technologies: string[];
  coverImage: string;
  stats: Stat[];
  metrics?: Record<string, string>;
};

const CaseStudyPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id || "";
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedStudies, setRelatedStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        
        const [studyResponse, relatedResponse] = await Promise.all([
          fetch(`/api/case-studies/${id}`),
          fetch('/api/case-studies')
        ]);
  
        if (!studyResponse.ok || !relatedResponse.ok) {
          throw new Error('Failed to fetch case study data');
        }
  
        const [studyData, allStudies] = await Promise.all([
          studyResponse.json(),
          relatedResponse.json()
        ]);
  
        // Convert metrics to stats format if needed
        if (studyData.metrics && !studyData.stats) {
          studyData.stats = Object.entries(studyData.metrics).map(([label, value]) => ({
            label,
            value: String(value)
          }));
        }
  
        // Ensure stats is always an array
        studyData.stats = studyData.stats || [];
  
        setStudy(studyData);
        setRelatedStudies(allStudies.filter((s: CaseStudy) => s.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    if (id) fetchCaseStudy();
  }, [id]);
  

  // Loading skeleton component
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-16">
        {/* Back button skeleton */}
        <div className="h-10 w-24 bg-white/10 rounded-full mb-8"></div>
        
        {/* Hero section skeleton */}
        <div className="mb-16">
          <div className="h-8 w-1/4 bg-white/10 rounded-full mb-6"></div>
          <div className="h-12 w-3/4 bg-white/10 rounded-full mb-4"></div>
          <div className="h-6 w-1/2 bg-white/10 rounded-full"></div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-1/3 bg-white/10 rounded-full mb-4"></div>
                <div className="h-4 w-full bg-white/10 rounded-full mb-2"></div>
                <div className="h-4 w-5/6 bg-white/10 rounded-full mb-2"></div>
                <div className="h-4 w-2/3 bg-white/10 rounded-full"></div>
              </div>
            ))}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-white/10 rounded-lg"></div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="h-64 bg-white/10 rounded-xl"></div>
            <div className="h-48 bg-white/10 rounded-xl"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (loading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Header />
        <div className="text-center max-w-md p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Case Study</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/case-studies')}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              Back to Case Studies
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#50a826] hover:bg-[#50a826]/90 rounded-full transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Header />
        <div className="text-center max-w-md p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Case Study Not Found</h2>
          <p className="text-white/80 mb-6">The requested case study could not be found.</p>
          <button
            onClick={() => router.push('/case-studies')}
            className="px-6 py-2 bg-[#50a826] hover:bg-[#50a826]/90 rounded-full transition-colors"
          >
            View All Case Studies
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main>
        {/* Back button */}
        <div className="container mx-auto px-4 pt-8">
          <motion.button
            onClick={() => router.push('/case-studies')}
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <FiArrowLeft className="text-[#50a826]" />
            Back to Case Studies
          </motion.button>
        </div>

        {/* Hero Section */}
        <section className="relative pt-16 pb-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${study.coverImage})`,
                filter: "blur(20px)"
              }}
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
                {study.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {study.title}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {study.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 bg-gradient-to-b from-black to-[#0a2009]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">The Challenge</h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {study.challenge}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">Our Solution</h2>
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    {study.solution}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {study.technologies.map((tech, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-colors"
                      >
                        <span className="text-white font-medium">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6">The Results</h2>
                  <ul className="space-y-4">
                    {study.results.map((result, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <span className="text-[#50a826] mr-3 mt-1">✓</span>
                        <span className="text-white/80 text-lg">{result}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Key Metrics</h3>
                  <div className="space-y-6">
                    {study.stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        viewport={{ once: true }}
                      >
                        <div className="text-3xl font-bold text-[#50a826]">{stat.value}</div>
                        <div className="text-white/60">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Have a similar project?</h3>
                  <p className="text-white/60 mb-6">Let's discuss how we can help you achieve remarkable results.</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium shadow-lg shadow-[#317e31]/30 hover:shadow-[#50a826]/40 transition-all w-full text-center"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* More Case Studies */}
        {relatedStudies.length > 0 && (
          <section className="py-24 bg-black">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
              >
                Explore More Case Studies
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedStudies.slice(0, 2).map((relatedStudy, index) => (
                  <motion.div
                    key={relatedStudy.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link href={`/case-studies/${relatedStudy.id}`}>
                      <div className="relative overflow-hidden rounded-xl h-64">
                        <div 
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                          style={{ 
                            backgroundImage: `url(${relatedStudy.coverImage})`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30" />
                        </div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-[#50a826]" />
                            <span className="text-xs font-medium text-[#50a826]">
                              {relatedStudy.category}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {relatedStudy.title}
                          </h3>
                          <span className="inline-flex items-center gap-1 text-sm text-[#50a826] font-medium">
                            View Case Study
                            <FiChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyPage;