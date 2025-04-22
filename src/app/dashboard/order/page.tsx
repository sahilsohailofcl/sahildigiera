"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { ArrowLeftIcon, CheckIcon, CreditCardIcon } from "@heroicons/react/24/outline";

const services = {
  starter: {
    title: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for lead generation and trust building",
    icon: "🌱",
    accentColor: "#317e31",
    features: [
      "1 Free Discovery Call (Zoom or in-app)",
      "Sales assistant explains services",
      "Personalized roadmap via email",
      "Access to client dashboard (limited view)",
      "1 blog or audit guide on their business",
      "Basic Analytics Setup"
    ]
  },
  growth: {
    title: "Growth",
    monthlyPrice: 499,
    annualPrice: 4790,
    description: "Ideal for freelancers and early-stage startups",
    icon: "🚀",
    accentColor: "#50a826",
    features: [
      "Custom Web Development (up to 5 pages)",
      "Basic CMS Setup",
      "1 design task per week",
      "1 development task every 2 weeks",
      "1 SEO audit report & optimization",
      "Content Marketing (2 blog posts/month)",
      "Social Media Marketing (2 platforms)",
      "Basic support (email / 1 call per month)",
      "5-day delivery turnaround"
    ]
  },
  pro: {
    title: "Pro",
    monthlyPrice: 999,
    annualPrice: 9590,
    description: "For established businesses looking to scale",
    icon: "💼",
    accentColor: "#45b645",
    features: [
      "Custom Web Development (up to 10 pages)",
      "Advanced CMS Setup",
      "Unlimited requests (one at a time)",
      "Weekly dev/design/marketing execution",
      "Custom landing pages, ads, email templates",
      "Content Marketing (4 blog posts/month)",
      "Social Media Marketing (4 platforms)",
      "On-Page SEO (up to 10 pages)",
      "Off-Page SEO (5 backlinks/month)",
      "PPC Campaign Management ($500 ad spend)",
      "Technical SEO Audit",
      "Performance reports",
      "Priority live chat",
      "2 calls/month"
    ]
  },
  elite: {
    title: "Elite",
    monthlyPrice: 1999,
    annualPrice: 19190,
    description: "Tailored for SaaS companies and enterprises",
    icon: "🏢",
    accentColor: "#3a8f3a",
    features: [
      "Custom Web Development (unlimited)",
      "Advanced CMS with Custom Features",
      "Dedicated account manager",
      "24-48 hr turnaround",
      "Up to 3 simultaneous tasks",
      "A/B testing, conversion strategy",
      "Full-stack dev (React, Next.js, API)",
      "Social Media Marketing (6 platforms)",
      "Content Marketing (8 blog posts/month)",
      "Comprehensive SEO Strategy",
      "PPC Campaign Management ($2000 ad spend)",
      "Technical SEO Optimization",
      "Advanced Analytics & Reporting",
      "Custom Integrations",
      "Weekly progress calls",
      "24/7 Priority Support via Slack/WhatsApp"
    ]
  }
};

export default function OrderPage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the subscription to your backend
    console.log("Subscription submitted:", { serviceId, billingCycle, ...formData });
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const selectedService = serviceId ? services[serviceId as keyof typeof services] : null;

  if (isSubmitted) {
    return (
      <div className="space-y-8">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#50a826]/20 flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-8 h-8 text-[#50a826]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Subscription Confirmed!</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Thank you for subscribing to our {selectedService?.title} plan. Your subscription will begin immediately.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard/pricing">
                <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back to Pricing
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button style={{ backgroundColor: "#50a826", color: "white" }}>
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Complete Your Subscription</h1>
          <p className="text-white/60 mt-1">
            {selectedService ? `Subscribe to the ${selectedService.title} plan` : "Select a plan to subscribe"}
          </p>
        </div>
        <Link href="/dashboard/pricing">
          <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Pricing
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-6">Billing Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-white/80">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-white/80">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  placeholder="1234 5678 9012 3456"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate" className="text-white/80">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                    placeholder="MM/YY"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-white/80">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    placeholder="123"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingAddress" className="text-white/80">Billing Address</Label>
                <Input
                  id="billingAddress"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white/80">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-white/80">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-white/80">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-white/80">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center bg-white/5 rounded-full p-1.5 border border-white/10 w-fit mx-auto">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-[#317e31] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === "annual"
                      ? "bg-[#317e31] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Annual (20% off)
                </button>
              </div>

              <Button
                type="submit"
                className="w-full"
                style={{ 
                  backgroundColor: selectedService?.accentColor || "#50a826",
                  color: "white"
                }}
              >
                Complete Subscription
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-6">Subscription Summary</h2>
            {selectedService ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${selectedService.accentColor}20` }}
                  >
                    {selectedService.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{selectedService.title}</h3>
                    <p className="text-white/60">{selectedService.description}</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Plan Price</span>
                    <span className="text-white font-medium">
                      {formatPrice(billingCycle === "monthly" ? selectedService.monthlyPrice : selectedService.annualPrice / 12)}/month
                    </span>
                  </div>
                  {billingCycle === "annual" && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80">Annual Savings</span>
                      <span className="text-[#50a826] font-medium">
                        {formatPrice(selectedService.monthlyPrice * 12 - selectedService.annualPrice)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-white font-bold text-lg">
                      {billingCycle === "monthly" 
                        ? formatPrice(selectedService.monthlyPrice) + "/month" 
                        : formatPrice(selectedService.annualPrice) + " billed annually"}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-sm font-medium text-white/70 mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div 
                          className="flex-shrink-0 mt-1 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${selectedService.accentColor}20` }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedService.accentColor }} />
                        </div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#317e31]/20 flex items-center justify-center mx-auto mb-4">
                  <CreditCardIcon className="w-6 h-6 text-[#50a826]" />
                </div>
                <p className="text-white/60 mb-4">No plan selected</p>
                <Link href="/dashboard/pricing">
                  <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                    Browse Plans
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 