"use client";
import Logo from "../assets/SahilDigiEraLogo.png";
import Image from "next/image";
import SocialX from "../assets/social-x.svg";
import SocialInsta from "../assets/social-insta.svg";
import SocialLinkedin from "../assets/social-linkedin.svg";
import SocialPin from "../assets/social-pin.svg";
import SocialYoutube from "../assets/social-youtube.svg";
import { motion } from "framer-motion";
import Link from "next/link";
import ArrowRight from "../assets/arrow-right.svg";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-[#bcbcbc] border-t border-white/10 relative">
      {/* Main Footer Content */}
      <div className="container py-16">
        {/* Newsletter & Quick Links - Fixed Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Newsletter - Now takes full width on mobile, first column on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src={Logo} 
                alt="Sahil DigiEra Logo" 
                width={40} 
                height={40} 
                className="relative" 
              />
              <h3 className="text-xl font-bold text-white">Sahil DigiEra</h3>
            </div>
            <p className="text-white/70 mb-6">
              Subscribe to our newsletter for digital insights and exclusive offers.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#317e31]"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#317e31] to-[#50a826] text-white font-medium"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>

          {/* Quick Links - Now spans 3 columns on desktop */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "/about" },
                  { name: "Careers", href: "/careers" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" },
                ],
              },
              {
                title: "Services",
                links: [
                  { name: "Web Development", href: "/services/web-development" },
                  { name: "Digital Marketing", href: "/services/digital-marketing" },
                  { name: "SEO", href: "/services/seo" },
                  { name: "UI/UX Design", href: "/services/design" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { name: "Case Studies", href: "/case-studies" },
                  { name: "Pricing", href: "#pricing" },
                  { name: "FAQ", href: "#faqs" },
                  { name: "Support", href: "/support" },
                ],
              },
            ].map((column, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-full" // Ensure full width within grid cell
              >
                <h3 className="text-white font-bold mb-4">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <motion.a
                        href={link.href}
                        className="flex items-center gap-2 text-white/60 hover:text-[#50a826] transition-colors group"
                        whileHover={{ x: 5 }}
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{link.name}</span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white/60 text-sm order-3 md:order-1"
          >
            © {currentYear} Sahil DigiEra. All rights reserved.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex gap-4 order-1 md:order-2"
          >
            {[
              { icon: SocialX, href: "https://x.com/SahilDigiEra" },
              { icon: SocialInsta, href: "https://www.instagram.com/sahildigiera/" },
              { icon: SocialLinkedin, href: "https://www.linkedin.com/company/sahildigiera/" },
              { icon: SocialPin, href: "https://uk.pinterest.com/sahildigiera/" },
              { icon: SocialYoutube, href: "https://www.youtube.com/channel/UCeIjvfnaB15nXDUhsq0SorQ" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(49, 126, 49, 0.2)" }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-5 h-5 text-white/80 hover:text-white transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex gap-4 text-sm order-2 md:order-3"
          >
            <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-white/60 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </footer>
  );
};