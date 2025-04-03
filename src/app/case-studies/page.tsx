"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { useEffect, useState, useRef } from "react";
import { FiSearch, FiX, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import router from "next/router";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  category: string;
  results: string[];
  coverImage: string;
  // Add other fields from your Prisma model as needed
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const caseStudiesPerPage = 9;
  const searchRef = useRef<HTMLInputElement>(null);

  // Extract all unique categories from case studies
  const allCategories = Array.from(new Set(caseStudies.map(study => study.category)));

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/case-studies');
        if (!response.ok) {
          throw new Error('Failed to fetch case studies');
        }
        const data = await response.json();
        setCaseStudies(data);
        setFilteredCaseStudies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Simulate network delay for demo purposes
    const timer = setTimeout(() => fetchCaseStudies(), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter case studies based on search query
  useEffect(() => {
    let result = caseStudies;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(study => 
        study.title.toLowerCase().includes(query) || 
        study.description.toLowerCase().includes(query) ||
        study.category.toLowerCase().includes(query) ||
        study.results.some(result => result.toLowerCase().includes(query))
      );
    }
    
    setFilteredCaseStudies(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, caseStudies]);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-6 py-16">
        {/* Hero Skeleton */}
        <div className="mb-16 text-center">
          <div className="h-10 w-1/4 mx-auto bg-white/10 rounded-full mb-6"></div>
          <div className="h-16 w-2/3 mx-auto bg-white/10 rounded-full mb-4"></div>
          <div className="h-6 w-1/2 mx-auto bg-white/10 rounded-full"></div>
        </div>

        {/* Search Skeleton */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-md h-14 bg-white/10 rounded-full"></div>
        </div>

        {/* Case Studies Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-full flex flex-col rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <div className="relative h-60 w-full bg-gradient-to-r from-white/10 to-white/5 animate-pulse"></div>
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                </div>
                <div className="h-6 w-3/4 bg-white/10 rounded-full mb-3"></div>
                <div className="h-4 w-full bg-white/10 rounded-full mb-2"></div>
                <div className="h-4 w-5/6 bg-white/10 rounded-full mb-4"></div>
                <div className="h-4 w-24 bg-white/10 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );

  // Pagination logic
  const indexOfLastCaseStudy = currentPage * caseStudiesPerPage;
  const indexOfFirstCaseStudy = indexOfLastCaseStudy - caseStudiesPerPage;
  const currentCaseStudies = filteredCaseStudies.slice(indexOfFirstCaseStudy, indexOfLastCaseStudy);
  const totalPages = Math.ceil(filteredCaseStudies.length / caseStudiesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-8 max-w-md bg-gradient-to-br from-red-900/20 to-red-900/10 rounded-2xl border border-red-900/30 shadow-lg"
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-900/20 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Oops!</h2>
            <p className="mb-6 text-white/80">{error}</p>
            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gradient-to-r from-red-900/50 to-red-800/50 rounded-full text-sm font-medium shadow-lg shadow-red-900/20"
              >
                Try Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/")}
                className="px-6 py-2 bg-gradient-to-r from-white/10 to-white/5 rounded-full text-sm font-medium shadow-lg shadow-white/5"
              >
                Go Home
              </motion.button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-cover"></div>
          </div>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#317e31]/20 text-[#50a826] text-sm font-medium mb-4">
                Our Work
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Case
                </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50a826] to-[#317e31]">
                  Studies
                </span>
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Explore how we've helped businesses achieve remarkable results through technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-gradient-to-b from-black to-[#0a2009]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-white/50" />
              </div>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search case studies..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#50a826]/50 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    searchRef.current?.focus();
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FiX className="text-white/50 hover:text-white transition-colors" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            {allCategories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <button
                  onClick={() => setSearchQuery("")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!searchQuery ? 'bg-[#50a826] text-white' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  All
                </button>
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSearchQuery(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${searchQuery === category ? 'bg-[#50a826] text-white' : 'bg-white/5 hover:bg-white/10'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Results Count */}
        {filteredCaseStudies.length > 0 && (
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <p className="text-white/60">
                Showing {indexOfFirstCaseStudy + 1}-{Math.min(indexOfLastCaseStudy, filteredCaseStudies.length)} of {filteredCaseStudies.length} results
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="flex items-center gap-1 text-sm text-[#50a826] hover:text-[#50a826]/80 transition-colors"
                >
                  Clear filters <FiX />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Case Studies Grid */}
        <section className="py-12 bg-gradient-to-b from-black to-[#0a2009]">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              {filteredCaseStudies.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-white/5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">No case studies found</h3>
                  <p className="text-white/60 max-w-md mx-auto mb-6">Try adjusting your search to find what you're looking for.</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-6 py-2 bg-[#50a826] hover:bg-[#50a826]/90 rounded-full text-sm font-medium transition-colors"
                  >
                    Reset filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="case-studies-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {currentCaseStudies.map((study, index) => (
                    <motion.div
                      key={study.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <Link href={`/case-studies/${study.id}`}>
                        <div className="relative overflow-hidden rounded-xl h-80">
                          <div 
                            className="absolute inset-0 bg-gray-800 group-hover:opacity-90 transition-opacity"
                            style={{ 
                              backgroundImage: `url(${study.coverImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30" />
                          </div>
                          <div className="absolute bottom-0 left-0 p-6 w-full">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="w-2 h-2 rounded-full bg-[#50a826]" />
                              <span className="text-xs font-medium text-[#50a826]">
                                {study.category}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {study.title}
                            </h3>
                            <p className="text-white/80 mb-4 line-clamp-2">
                              {study.description}
                            </p>
                            <span className="inline-flex items-center gap-1 text-sm text-[#50a826] font-medium">
                              View Case Study
                              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {filteredCaseStudies.length > caseStudiesPerPage && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                  >
                    <FiChevronLeft />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show first pages, current page with neighbors, or last pages
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === pageNum ? 'bg-[#50a826] text-white' : 'bg-white/5 hover:bg-white/10'} transition-colors`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-2">...</span>
                  )}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => paginate(totalPages)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === totalPages ? 'bg-[#50a826] text-white' : 'bg-white/5 hover:bg-white/10'} transition-colors`}
                    >
                      {totalPages}
                    </button>
                  )}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                  >
                    <FiChevronRight />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help your business grow with technology.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium shadow-lg shadow-[#317e31]/30 hover:shadow-[#50a826]/40 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}