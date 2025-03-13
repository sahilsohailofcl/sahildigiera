"use client";

import { motion, AnimatePresence } from "framer-motion";
import ArrowRight from "../assets/arrow-right.svg";
import Logo from "../assets/SahilDigiEraLogo.png";
import Image from "next/image";
import MenuIcon from "../assets/menu.svg";
import Link from "next/link";
import { useState, useEffect } from "react";

export const Header = () => {
  const [showFirstText, setShowFirstText] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstText((prev) => !prev);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Toggle mobile menu and disable scrolling
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      {/* Top Bar */}
      <div className="flex justify-center items-center py-3 text-white text-sm" style={{backgroundImage: "linear-gradient(#50a826, #317e31)"}}>
        <div className="inline-flex gap-3 items-center overflow-hidden relative h-6 w-full justify-center">
          <AnimatePresence mode="wait">
            {showFirstText ? (
              <motion.p
                key="first-text"
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-white/80 lg:hidden"
              >
                Got a project? Not sure where to start?
              </motion.p>
            ) : (
              <motion.div
                key="second-text"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="inline-flex gap-1 items-center lg:hidden"
              >
                <a href="/contact" className="text-white">Contact us today!</a>
                <ArrowRight className="h-4 w-4 inline-flex justify-center items-center text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Default Text for Desktop */}
          <div className="hidden lg:inline-flex gap-3 items-center">
            <p className="text-white/80">
              Got a project? Not sure where to start?
            </p>
            <div className="inline-flex gap-1 items-center">
              <a href="/contact">
                <p className="text-white">Contact us today!</p>
              </a>
              <ArrowRight className="h-4 w-4 inline-flex justify-center items-center text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="py-5 bg-black">
        <div className="container">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" aria-label="Home">
              <Image src={Logo} alt="Sahil DigiEra Logo" height={40} width={224} />
            </Link>

            {/* Mobile Menu Icon (Visible on Tablet and Mobile) */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-all duration-200"
            >
              <MenuIcon className="h-5 w-5" />
            </button>

            {/* Navigation Links (Hidden on Tablet and Mobile) */}
            <nav className="hidden lg:flex gap-6 text-white/60 items-center">
              <Link href="/about" className="hover:text-white transition-all duration-200">
                About
              </Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <a href="/services">
                  <div className="hover:text-white transition-all duration-200 cursor-pointer">
                    Services
                  </div>
                </a>
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-3"
                  style={{
                    background: "rgba(80, 168, 38, 0.15)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <ul className="py-2 text-white">
                    <li className="px-6 py-4 mb-2 rounded-lg hover:bg-white/10 transition-all duration-200">
                      <Link href="/services/web-development" className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 17.722c.595-.347 1-.985 1-1.722V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v11c0 .736.405 1.375 1 1.722V18H2v2h20v-2h-2v-.278zM5 16V5h14l.002 11H5z"></path>
                        </svg>
                        <span>Web Development</span>
                      </Link>
                    </li>
                    <li className="px-6 py-4 mb-2 rounded-lg hover:bg-white/10 transition-all duration-200">
                      <Link href="/services/seo" className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15.78 15.84S18.64 13 19.61 12c3.07-3 1.54-9.18 1.54-9.18S15 1.29 12 4.36C9.66 6.64 8.14 8.22 8.14 8.22S4.3 7.42 2 9.72L14.25 22c2.3-2.33 1.53-6.16 1.53-6.16zm-1.5-9a2 2 0 0 1 2.83 0 2 2 0 1 1-2.83 0zM3 21a7.81 7.81 0 0 0 5-2l-3-3c-2 1-2 5-2 5z"></path>
                        </svg>
                        <span>SEO Optimization</span>
                      </Link>
                    </li>
                    <li className="px-6 py-4 rounded-lg hover:bg-white/10 transition-all duration-200">
                      <Link href="/services/marketing" className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="currentColor">
                          <path d="M39 25h6c1.31-.01 1.31-1.99 0-2h-6c-1.31.01-1.31 1.99 0 2zM38 17c.26 0 .51-.1.71-.29l3-3a.996.996 0 1 0-1.41-1.41l-3 3c-.64.59-.16 1.73.7 1.7zM40.29 35.71c.93.92 2.34-.49 1.41-1.41l-3-3a.996.996 0 1 0-1.41 1.41zM25.28 37.36c.35.33 2.51 2.93 2.94 3.11 1.94 1.39 4.85-.15 4.78-2.55V10.08c.07-2.42-2.89-3.96-4.83-2.52-1.55 1.35-3.26 3.8-4.93 5-3.13 2.65-7.16 4.15-11.24 4.41v14.06c1.47.12 2.94.32 4.35.75 3.42.98 6.54 2.95 8.93 5.58zM2.09 26.9C2.5 29.22 4.63 31.02 7 31h3V17H7c-2.76 0-5 2.24-5 5 .03.7-.08 4.29.09 4.9zM7 33c-.7 0-1.37-.11-2-.29V38c.1 3.95 5.9 3.96 6 0v-5H7z"></path>
                        </svg>
                        <span>Digital Marketing</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <Link href="/#clients" className="hover:text-white transition-all duration-200">
                Clients
              </Link>
              <Link href="/#pricing" className="hover:text-white transition-all duration-200">
                Pricing
              </Link>
              <Link href="/blogs" className="hover:text-white transition-all duration-200">
                Blogs
              </Link>

              {/* CTA Button */}
              <button
                onClick={() => (window.location.href = "/contact")}
                className="text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center tracking-tight"
                style={{ backgroundColor: "#317e31" }}
              >
                Get a Quote
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Visible on Tablet and Mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-black z-30 lg:hidden min-h-screen w-screen"
          >
            <div className="container py-5 bg-black min-h-screen w-screen">
              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={toggleMenu}
                  aria-label="Close Menu"
                  className="text-white p-2 hover:bg-white/10 rounded-full transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Links */}
              <nav className="flex flex-col gap-6 text-white/80 items-center mt-10">
                <Link href="/about" onClick={toggleMenu} className="hover:text-white transition-all duration-200 hover:scale-105">
                  About
                </Link>

                {/* Services Dropdown */}
                <div className="relative group">
                  <a href="/services">
                    <div className="hover:text-white transition-all duration-200 cursor-pointer hover:scale-105">
                      Services
                    </div>
                  </a>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-3"
                    style={{
                      background: "rgba(80, 168, 38, 0.15)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <ul className="py-2 text-white">
                      <li className="px-6 py-4 mb-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-105">
                        <Link href="/services/web-development" className="flex items-center gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 17.722c.595-.347 1-.985 1-1.722V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v11c0 .736.405 1.375 1 1.722V18H2v2h20v-2h-2v-.278zM5 16V5h14l.002 11H5z"></path>
                          </svg>
                          <span>Web Development</span>
                        </Link>
                      </li>
                      <li className="px-6 py-4 mb-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-105">
                        <Link href="/services/seo" className="flex items-center gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.78 15.84S18.64 13 19.61 12c3.07-3 1.54-9.18 1.54-9.18S15 1.29 12 4.36C9.66 6.64 8.14 8.22 8.14 8.22S4.3 7.42 2 9.72L14.25 22c2.3-2.33 1.53-6.16 1.53-6.16zm-1.5-9a2 2 0 0 1 2.83 0 2 2 0 1 1-2.83 0zM3 21a7.81 7.81 0 0 0 5-2l-3-3c-2 1-2 5-2 5z"></path>
                          </svg>
                          <span>SEO Optimization</span>
                        </Link>
                      </li>
                      <li className="px-6 py-4 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-105">
                        <Link href="/services/marketing" className="flex items-center gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="currentColor">
                            <path d="M39 25h6c1.31-.01 1.31-1.99 0-2h-6c-1.31.01-1.31 1.99 0 2zM38 17c.26 0 .51-.1.71-.29l3-3a.996.996 0 1 0-1.41-1.41l-3 3c-.64.59-.16 1.73.7 1.7zM40.29 35.71c.93.92 2.34-.49 1.41-1.41l-3-3a.996.996 0 1 0-1.41 1.41zM25.28 37.36c.35.33 2.51 2.93 2.94 3.11 1.94 1.39 4.85-.15 4.78-2.55V10.08c.07-2.42-2.89-3.96-4.83-2.52-1.55 1.35-3.26 3.8-4.93 5-3.13 2.65-7.16 4.15-11.24 4.41v14.06c1.47.12 2.94.32 4.35.75 3.42.98 6.54 2.95 8.93 5.58zM2.09 26.9C2.5 29.22 4.63 31.02 7 31h3V17H7c-2.76 0-5 2.24-5 5 .03.7-.08 4.29.09 4.9zM7 33c-.7 0-1.37-.11-2-.29V38c.1 3.95 5.9 3.96 6 0v-5H7z"></path>
                          </svg>
                          <span>Digital Marketing</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <Link href="/#clients" onClick={toggleMenu} className="hover:text-white transition-all duration-200 hover:scale-105">
                  Clients
                </Link>
                <Link href="/#pricing" onClick={toggleMenu} className="hover:text-white transition-all duration-200 hover:scale-105">
                  Pricing
                </Link>
                <Link href="/blogs" onClick={toggleMenu} className="hover:text-white transition-all duration-200 hover:scale-105">
                  Blogs
                </Link>

                {/* CTA Button */}
                <button
                  onClick={() => (window.location.href = "/contact")}
                  className="text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center tracking-tight"
                  style={{ backgroundColor: "#317e31" }}
                >
                  Get a Quote
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};