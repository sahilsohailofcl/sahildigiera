"use client";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { LogoTicker } from "./sections/LogoTicker";
import { PortfolioShowcase } from "./sections/PortfolioShowcase";
import { ProcessSection } from "./sections/ProcessSection";
import { CaseStudies } from "./sections/CaseStudies";
import { Pricing } from "./sections/Pricing";
import { Testimonials } from "./sections/Testimonials";
import { TechStack } from "./sections/TechStack";
import { FAQS } from "./sections/Faqs";
import { CallToAction } from "./sections/CallToAction";
import { Footer } from "./sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero /> 
      <LogoTicker /> 
      <PortfolioShowcase />
      <ProcessSection />
      <CaseStudies />
      <section id="pricing">
        <Pricing />
      </section>
      <section id="clients">
        <Testimonials />
      </section>
      <TechStack />
      <section id="faqs">
      <FAQS />
      </section>
      <CallToAction />
      <Footer />
    </>
  );
}