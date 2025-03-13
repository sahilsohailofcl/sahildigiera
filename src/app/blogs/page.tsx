"use client";

import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import BlogImage1 from "../assets/hero-image.png"; // Replace with your images
import BlogImage2 from "../assets/hero-image.png";
import BlogImage3 from "../assets/hero-image.png";

const blogs = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    description:
      "Discover the latest trends in web development, from AI-powered tools to progressive web apps, and how they’re shaping the future of the web.",
    image: BlogImage1,
    date: "October 10, 2023",
    author: "Sahil DigiEra",
  },
  {
    id: 2,
    title: "Mastering SEO: Tips to Rank Higher on Google",
    description:
      "Learn proven SEO strategies to improve your website’s visibility, drive organic traffic, and stay ahead of the competition.",
    image: BlogImage2,
    date: "September 25, 2023",
    author: "Sahil DigiEra",
  },
  {
    id: 3,
    title: "Why Digital Marketing is Essential for Business Growth",
    description:
      "Explore how digital marketing can transform your business, from social media campaigns to data-driven analytics.",
    image: BlogImage3,
    date: "September 15, 2023",
    author: "Sahil DigiEra",
  },
];

export default function Blogs() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
        {/* Glass Morphism Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl p-8 rounded-2xl shadow-lg backdrop-blur-md bg-white/5 border border-white/10 relative overflow-hidden"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(49,126,49,0.2)_0%,_transparent_70%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,224,99,0.1)_0%,_transparent_70%)] animate-pulse delay-1000"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-b from-white/90 to-[#317e31] text-transparent bg-clip-text"
            >
              Blogs
            </motion.h1>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/80 text-center mb-8"
            >
              Explore the latest insights, trends, and tips in web development, SEO, and digital marketing from the experts at{" "}
              <span className="text-[#317e31] font-semibold">Sahil DigiEra</span>.
            </motion.p>

            {/* Blog List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-[#317e31] mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-white/80 mb-4">{blog.description}</p>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>{blog.date}</span>
                    <span>By {blog.author}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}