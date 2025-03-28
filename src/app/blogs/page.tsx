"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { useRouter } from "next/navigation";
import { FiSearch, FiX, FiClock, FiUser, FiCalendar, FiArrowRight } from "react-icons/fi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Blog {
  id: number;
  image?: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime?: string;
  tags?: string[];
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  // Extract all unique tags from blogs
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags || [])));

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    // Simulate network delay for demo purposes
    const timer = setTimeout(() => fetchBlogs(), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter blogs based on search query and selected tag
  useEffect(() => {
    let result = blogs;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(blog => 
        blog.title.toLowerCase().includes(query) || 
        blog.description.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    if (selectedTag) {
      result = result.filter(blog => blog.tags && blog.tags.includes(selectedTag));
    }
    
    setFilteredBlogs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedTag, blogs]);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-6 py-16">
        {/* Hero Skeleton */}
        <div className="mb-16">
          <div className="h-10 w-1/3 bg-white/10 rounded-full mb-6"></div>
          <div className="h-16 w-2/3 bg-white/10 rounded-full mb-4"></div>
          <div className="h-6 w-1/2 bg-white/10 rounded-full"></div>
        </div>

        {/* Search and Filter Skeleton */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-grow h-14 bg-white/10 rounded-full"></div>
          <div className="h-14 w-40 bg-white/10 rounded-full"></div>
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mb-12">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-white/10 rounded-full"></div>
          ))}
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-full flex flex-col rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <div className="relative h-48 w-full bg-gradient-to-r from-white/10 to-white/5 animate-pulse"></div>
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                  <div className="h-6 w-16 bg-white/10 rounded-full"></div>
                </div>
                <div className="h-6 w-3/4 bg-white/10 rounded-full mb-3"></div>
                <div className="h-4 w-full bg-white/10 rounded-full mb-2"></div>
                <div className="h-4 w-5/6 bg-white/10 rounded-full mb-4"></div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10"></div>
                  <div className="h-4 w-20 bg-white/10 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

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
    <>
      <Header />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative h-64 md:h-96 w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 z-0"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] bg-cover"></div>
          <div className="relative z-10 text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#50a826] via-[#317e31] to-[#50a826] text-transparent bg-clip-text"
            >
              Our Blogs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="text-xl text-white/80 max-w-2xl mx-auto"
            >
              Insights, stories, and ideas from our team
            </motion.p>
          </div>
        </div>

        {/* Blog List */}
        <div className="container mx-auto px-6 py-16">
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-white/50" />
              </div>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search blogs..."
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
            <select
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#50a826]/50 focus:border-transparent transition-all appearance-none"
              value={selectedTag || ""}
              onChange={(e) => setSelectedTag(e.target.value || null)}
            >
              <option value="">All Categories</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedTag ? 'bg-[#50a826] text-white' : 'bg-white/5 hover:bg-white/10'}`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tag === selectedTag ? 'bg-[#50a826] text-white' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-white/60">
              Showing {indexOfFirstBlog + 1}-{Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} results
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="flex items-center gap-1 text-sm text-[#50a826] hover:text-[#50a826]/80 transition-colors"
              >
                Clear filters <FiX />
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {filteredBlogs.length === 0 ? (
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
                <h3 className="text-2xl font-bold mb-2">No blogs found</h3>
                <p className="text-white/60 max-w-md mx-auto mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                  className="px-6 py-2 bg-[#50a826] hover:bg-[#50a826]/90 rounded-full text-sm font-medium transition-colors"
                >
                  Reset filters
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="blog-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentBlogs.map((blog, index) => (
                  <Link key={blog.id} href={`/blogs/${blog.id}`} scroll={false}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ 
                        y: -8,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      className="h-full flex flex-col rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.01] backdrop-blur-sm border border-white/10 hover:border-[#50a826]/50 transition-all duration-300 group"
                    >
                      {blog.image && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <motion.img
                            src={blog.image}
                            alt={blog.title}
                            className="object-cover w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                          {/* Tags overlay */}
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                              {blog.tags.slice(0, 2).map(tag => (
                                <span 
                                  key={tag} 
                                  className="px-2 py-1 text-xs font-medium rounded-full bg-[#50a826]/80 backdrop-blur-sm text-white"
                                >
                                  {tag}
                                </span>
                              ))}
                              {blog.tags.length > 2 && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/70 backdrop-blur-sm text-white">
                                  +{blog.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-6 flex-grow">
                        <div className="flex items-center gap-3 mb-3 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <FiCalendar className="text-[#50a826]" size={14} />
                            {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          {blog.readTime && (
                            <span className="flex items-center gap-1">
                              <FiClock className="text-[#50a826]" size={14} />
                              {blog.readTime}
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-bold mb-2 group-hover:text-[#50a826] transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                        <p className="text-white/80 mb-4 line-clamp-3">{blog.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                              <FiUser size={12} />
                            </div>
                            <span>By {blog.author}</span>
                          </div>
                          <div className="text-[#50a826] group-hover:translate-x-1 transition-transform">
                            <FiArrowRight size={18} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {filteredBlogs.length > blogsPerPage && (
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
      </div>
      <Footer />
    </>
  );
}