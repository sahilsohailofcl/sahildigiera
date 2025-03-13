import Logo from "../assets/SahilDigiEraLogo.png";
import Image from "next/image";
import SocialX from "../assets/social-x.svg";
import SocialInsta from "../assets/social-insta.svg";
import SocialLinkedin from "../assets/social-linkedin.svg";
import SocialPin from "../assets/social-pin.svg";
import SocialYoutube from "../assets/social-youtube.svg";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#bcbcbc] text-sm py-10 flex justify-center items-center border-t-[1px] border-[#317e31]/20">
      <div className="container">
        {/* Top Section: Logo and Navigation */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Logo */}
          <motion.a
            className="flex justify-center md:justify-start mb-4 md:mb-0"
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src={Logo} alt="Sahil DigiEra Logo" height={40} className="relative" />
          </motion.a>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            {/* First Row (Mobile and Desktop) */}
            <div className="flex gap-4">
              <motion.a
                href="/about"
                className="hover:text-white transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                About
              </motion.a>
              <motion.a
                href="/services"
                className="hover:text-white transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Services
              </motion.a>
              <motion.a
                href="/#clients"
                className="hover:text-white transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clients
              </motion.a>
              <motion.a
                href="/#pricing"
                className="hover:text-white transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Pricing
              </motion.a>
            </div>
            {/* Second Row (Mobile Only) */}
            <div className="flex gap-4 mt-2 md:mt-0">
            <motion.a
                href="/blogs"
                className="hover:text-white transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Blogs
              </motion.a>
              <motion.a
                href="/contact"
                className="hover:text-white transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.a>
              <motion.a
                href="/careers"
                className="hover:text-white transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Careers
              </motion.a>
            </div>
          </nav>
        </div>

        {/* Horizontal Line */}
        <hr className="border-t border-white/10 my-6" />

        {/* Bottom Section: Social Icons and Copyright */}
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          {/* Social Icons */}
          <div className="flex gap-4 order-1 md:order-2 mb-4 md:mb-0">
            <motion.a
              href="https://x.com/SahilDigiEra"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SocialX className="hover:opacity-80 transition-opacity" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/sahildigiera/"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SocialInsta className="hover:opacity-80 transition-opacity" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/company/sahildigiera/"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SocialLinkedin className="hover:opacity-80 transition-opacity" />
            </motion.a>
            <motion.a
              href="https://uk.pinterest.com/sahildigiera/"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SocialPin className="hover:opacity-80 transition-opacity" />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/channel/UCeIjvfnaB15nXDUhsq0SorQ"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SocialYoutube className="hover:opacity-80 transition-opacity" />
            </motion.a>
          </div>

          {/* Copyright */}
          <p className="order-2 md:order-1 text-center md:text-left text-white/60">
            © 2025 Sahil DigiEra. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};