"use client";
import GoogleLogo from "../assets/Google.png";
import FramerLogo from "../assets/Framer.png";
import WebFlowLogo from "../assets/WebFlow.webp";
import OpenAiLogo from "../assets/OpenAi.png";
import AdobeLogo from "../assets/Adobe.png";
import MernLogo from "../assets/Mern.png";
import Image from "next/image";
import { motion } from "framer-motion";

export const LogoTicker = () => {
  return (
    <section className="py-8 md:py-12 bg-black">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <Image src={GoogleLogo} alt="Aceme Logo" className="logo-ticker-image" />
            <Image src={FramerLogo} alt="Quantum Logo" className="logo-ticker-image" />
            <Image src={WebFlowLogo} alt="Echo Logo" className="logo-ticker-image" />
            <Image src={OpenAiLogo} alt="Celestial Logo" className="logo-ticker-image" />
            <Image src={AdobeLogo} alt="Pulse Logo" className="logo-ticker-image" />
            <Image src={MernLogo} alt="Apex Logo" className="logo-ticker-image" />

            {/* Second set of Logos for continuous loop */}
            <Image src={GoogleLogo} alt="Aceme Logo" className="logo-ticker-image" />
            <Image src={FramerLogo} alt="Quantum Logo" className="logo-ticker-image" />
            <Image src={WebFlowLogo} alt="Echo Logo" className="logo-ticker-image" />
            <Image src={OpenAiLogo} alt="Celestial Logo" className="logo-ticker-image" />
            <Image src={AdobeLogo} alt="Pulse Logo" className="logo-ticker-image" />
            <Image src={MernLogo} alt="Apex Logo" className="logo-ticker-image" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};