"use client";

import { motion, AnimatePresence } from "framer-motion";
import ArrowRight from "../assets/arrow-right.svg";
import Logo from "../assets/SahilDigiEraLogo.png";
import Image from "next/image";
import MenuIcon from "../assets/menu.svg";
import CloseIcon from "../assets/close.svg";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export const Header = () => {
  const [showFirstText, setShowFirstText] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Toggle text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstText((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-black"}`}
    >
      {/* Announcement Bar */}
      <div 
        className="flex justify-center items-center py-2 text-white text-sm w-full overflow-hidden"
        style={{ background: "linear-gradient(90deg, #317e31 0%, #50a826 100%)" }}
      >
        <div className="inline-flex gap-3 items-center overflow-hidden relative h-6 w-full justify-center">
          <AnimatePresence mode="wait">
            {showFirstText ? (
              <motion.p
                key="first-text"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-white lg:hidden text-center px-4"
              >
                Got a project? Not sure where to start?
              </motion.p>
            ) : (
              <motion.div
                key="second-text"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="inline-flex gap-1 items-center lg:hidden"
              >
                <Link href="/contact" className="text-white font-medium hover:underline">
                  Contact us today!
                </Link>
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Announcement */}
          <div className="hidden lg:flex items-center gap-4">
            <p className="text-white">
              Got a project? Not sure where to start?
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-1 font-medium hover:underline"
            >
              <span>Contact us today!</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            aria-label="Home"
            className="relative z-40"
          >
            <Image 
              src={Logo} 
              alt="Sahil DigiEra Logo" 
              height={40} 
              width={224}
              className="hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="/about" 
              className="text-white/80 hover:text-white transition-all font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#317e31] transition-all group-hover:w-full"></span>
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-white/80 hover:text-white transition-all font-medium flex items-center gap-1">
                <span>Services</span>
                <svg 
                  className="w-4 h-4 transition-transform group-hover:rotate-180" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 -translate-x-1/2 mt-6 w-64 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                style={{
                  background: "rgba(15, 15, 15, 0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="p-2">
                  <Link 
                    href="/services/web-development" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
                  >
                    <div className="p-2 rounded-lg bg-[#317e31]/80">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="currentColor">
                        <path d="M20 17.722c.595-.347 1-.985 1-1.722V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v11c0 .736.405 1.375 1 1.722V18H2v2h20v-2h-2v-.278zM5 16V5h14l.002 11H5z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Web Development</p>
                      <p className="text-xs text-white/60">Custom websites & apps</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/services/seo" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
                  >
                    <div className="p-2 rounded-lg bg-[#317e31]/80">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="currentColor">
                        <path d="M15.78 15.84S18.64 13 19.61 12c3.07-3 1.54-9.18 1.54-9.18S15 1.29 12 4.36C9.66 6.64 8.14 8.22 8.14 8.22S4.3 7.42 2 9.72L14.25 22c2.3-2.33 1.53-6.16 1.53-6.16zm-1.5-9a2 2 0 0 1 2.83 0 2 2 0 1 1-2.83 0zM3 21a7.81 7.81 0 0 0 5-2l-3-3c-2 1-2 5-2 5z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">SEO Optimization</p>
                      <p className="text-xs text-white/60">Higher search rankings</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/services/digital-marketing" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
                  >
                    <div className="p-2 rounded-lg bg-[#317e31]/80">
                      <svg width="20" height="20" viewBox="0 0 48 48" fill="#ffffff" stroke="currentColor">
                        <path d="M39 25h6c1.31-.01 1.31-1.99 0-2h-6c-1.31.01-1.31 1.99 0 2zM38 17c.26 0 .51-.1.71-.29l3-3a.996.996 0 1 0-1.41-1.41l-3 3c-.64.59-.16 1.73.7 1.7zM40.29 35.71c.93.92 2.34-.49 1.41-1.41l-3-3a.996.996 0 1 0-1.41 1.41zM25.28 37.36c.35.33 2.51 2.93 2.94 3.11 1.94 1.39 4.85-.15 4.78-2.55V10.08c.07-2.42-2.89-3.96-4.83-2.52-1.55 1.35-3.26 3.8-4.93 5-3.13 2.65-7.16 4.15-11.24 4.41v14.06c1.47.12 2.94.32 4.35.75 3.42.98 6.54 2.95 8.93 5.58zM2.09 26.9C2.5 29.22 4.63 31.02 7 31h3V17H7c-2.76 0-5 2.24-5 5 .03.7-.08 4.29.09 4.9zM7 33c-.7 0-1.37-.11-2-.29V38c.1 3.95 5.9 3.96 6 0v-5H7z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Digital Marketing</p>
                      <p className="text-xs text-white/60">Targeted campaigns</p>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>

            <Link 
              href="/#clients" 
              className="text-white/80 hover:text-white transition-all font-medium relative group"
            >
              Clients
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#317e31] transition-all group-hover:w-full"></span>
            </Link>

            <Link 
              href="/#pricing" 
              className="text-white/80 hover:text-white transition-all font-medium relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#317e31] transition-all group-hover:w-full"></span>
            </Link>

            <Link 
              href="/blogs" 
              className="text-white/80 hover:text-white transition-all font-medium relative group"
            >
              Blogs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#317e31] transition-all group-hover:w-full"></span>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = "/contact"}
              className="px-6 py-2.5 rounded-lg font-medium text-white bg-[#317e31] hover:bg-[#3a8f3a] transition-all shadow-lg shadow-[#317e31]/20"
            >
              Get a Quote
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-all relative z-40"
          >
            {isMenuOpen ? (
              <CloseIcon className="w-6 h-6 text-white" />
            ) : (
              <MenuIcon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-30 lg:hidden pt-24 px-6 pb-10"
          >
            <nav className="flex flex-col gap-6 text-white">
              <Link 
                href="/about" 
                onClick={closeMenu}
                className="text-2xl font-medium py-3 border-b border-white/10 hover:text-[#317e31] transition-all"
              >
                About
              </Link>

              <div className="border-b border-white/10">
                <details className="group">
                  <summary className="flex justify-between items-center text-2xl font-medium py-3 list-none cursor-pointer hover:text-[#317e31] transition-all">
                    <span>Services</span>
                    <svg 
                      className="w-6 h-6 transition-transform group-open:rotate-180" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </summary>
                  <div className="ml-4 mt-2 mb-4 flex flex-col gap-4">
                    <Link 
                      href="/services/web-development" 
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <div className="p-2 rounded-lg bg-[#317e31]/80">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="currentColor">
                          <path d="M20 17.722c.595-.347 1-.985 1-1.722V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v11c0 .736.405 1.375 1 1.722V18H2v2h20v-2h-2v-.278zM5 16V5h14l.002 11H5z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Web Development</p>
                        <p className="text-sm text-white/60">Custom websites & apps</p>
                      </div>
                    </Link>
                    
                    <Link 
                      href="/services/seo" 
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <div className="p-2 rounded-lg bg-[#317e31]/80">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="currentColor">
                          <path d="M15.78 15.84S18.64 13 19.61 12c3.07-3 1.54-9.18 1.54-9.18S15 1.29 12 4.36C9.66 6.64 8.14 8.22 8.14 8.22S4.3 7.42 2 9.72L14.25 22c2.3-2.33 1.53-6.16 1.53-6.16zm-1.5-9a2 2 0 0 1 2.83 0 2 2 0 1 1-2.83 0zM3 21a7.81 7.81 0 0 0 5-2l-3-3c-2 1-2 5-2 5z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">SEO Optimization</p>
                        <p className="text-sm text-white/60">Higher search rankings</p>
                      </div>
                    </Link>
                    
                    <Link 
                      href="/services/digital-marketing" 
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <div className="p-2 rounded-lg bg-[#317e31]/80">
                        <svg width="20" height="20" viewBox="0 0 48 48" fill="#ffffff" stroke="currentColor">
                          <path d="M39 25h6c1.31-.01 1.31-1.99 0-2h-6c-1.31.01-1.31 1.99 0 2zM38 17c.26 0 .51-.1.71-.29l3-3a.996.996 0 1 0-1.41-1.41l-3 3c-.64.59-.16 1.73.7 1.7zM40.29 35.71c.93.92 2.34-.49 1.41-1.41l-3-3a.996.996 0 1 0-1.41 1.41zM25.28 37.36c.35.33 2.51 2.93 2.94 3.11 1.94 1.39 4.85-.15 4.78-2.55V10.08c.07-2.42-2.89-3.96-4.83-2.52-1.55 1.35-3.26 3.8-4.93 5-3.13 2.65-7.16 4.15-11.24 4.41v14.06c1.47.12 2.94.32 4.35.75 3.42.98 6.54 2.95 8.93 5.58zM2.09 26.9C2.5 29.22 4.63 31.02 7 31h3V17H7c-2.76 0-5 2.24-5 5 .03.7-.08 4.29.09 4.9zM7 33c-.7 0-1.37-.11-2-.29V38c.1 3.95 5.9 3.96 6 0v-5H7z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Digital Marketing</p>
                        <p className="text-sm text-white/60">Targeted campaigns</p>
                      </div>
                    </Link>
                  </div>
                </details>
              </div>

              <Link 
                href="/#clients" 
                onClick={closeMenu}
                className="text-2xl font-medium py-3 border-b border-white/10 hover:text-[#317e31] transition-all"
              >
                Clients
              </Link>

              <Link 
                href="/#pricing" 
                onClick={closeMenu}
                className="text-2xl font-medium py-3 border-b border-white/10 hover:text-[#317e31] transition-all"
              >
                Pricing
              </Link>

              <Link 
                href="/blogs" 
                onClick={closeMenu}
                className="text-2xl font-medium py-3 border-b border-white/10 hover:text-[#317e31] transition-all"
              >
                Blogs
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  closeMenu();
                  window.location.href = "/contact";
                }}
                className="mt-6 px-8 py-4 rounded-xl font-medium text-white bg-[#317e31] hover:bg-[#3a8f3a] transition-all text-xl text-center shadow-lg shadow-[#317e31]/30"
              >
                Get a Quote
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};