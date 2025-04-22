"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

// Dummy tickets data
const dummyTickets = [
  {
    id: "TK-001",
    subject: "Website Loading Issue",
    status: "Resolved",
    date: "2024-03-15",
    priority: "High",
    description: "The website is taking too long to load on mobile devices. Need immediate attention.",
    response: "Issue has been resolved by optimizing image sizes and implementing lazy loading.",
  },
  {
    id: "TK-002",
    subject: "Payment Gateway Integration",
    status: "In Progress",
    date: "2024-03-14",
    priority: "Medium",
    description: "Need to integrate a new payment gateway for international transactions.",
    response: "Currently working on the integration with Stripe. Expected completion by next week.",
  },
  {
    id: "TK-003",
    subject: "Mobile App Bug Report",
    status: "Pending",
    date: "2024-03-13",
    priority: "High",
    description: "App crashes when trying to upload large files. Occurs on iOS devices only.",
    response: "Under investigation. Our team is analyzing the crash logs.",
  },
  {
    id: "TK-004",
    subject: "Feature Request: Dark Mode",
    status: "Under Review",
    date: "2024-03-12",
    priority: "Low",
    description: "Request to add dark mode support for better user experience in low-light conditions.",
    response: "Feature request has been added to our roadmap. Will be reviewed in the next sprint planning.",
  },
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Support ticket data:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "In Progress":
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      case "Pending":
        return <ExclamationCircleIcon className="w-5 h-5 text-yellow-500" />;
      case "Under Review":
        return <ClockIcon className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "text-green-500";
      case "In Progress":
        return "text-blue-500";
      case "Pending":
        return "text-yellow-500";
      case "Under Review":
        return "text-purple-500";
      default:
        return "text-white/60";
    }
  };

  const toggleTicket = (ticketId: string) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeftIcon className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Support</h1>
          <p className="text-white/60 mt-1">Get help from our team</p>
        </div>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-xl p-6 border border-white/10"
        >
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#50a826]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <EnvelopeIcon className="w-8 h-8 text-[#50a826]" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Support Ticket Submitted!</h2>
            <p className="text-white/60 mb-6">
              We've received your request and will get back to you as soon as possible.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  Back to Dashboard
                </Button>
              </Link>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#50a826] text-white hover:bg-[#50a826]/80 border-none"
              >
                Submit Another Ticket
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Submit a Support Ticket</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's your issue about?"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your issue in detail"
                    rows={6}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#50a826] text-white hover:bg-[#50a826]/80 border-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Ticket"}
                  </Button>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Recent Tickets</h2>
              <div className="space-y-4">
                {dummyTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors"
                      onClick={() => toggleTicket(ticket.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {getStatusIcon(ticket.status)}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{ticket.subject}</h3>
                          <p className="text-white/60 text-sm">Ticket #{ticket.id} • {ticket.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                          <span className="text-white/40 text-sm">•</span>
                          <span className="text-white/60 text-sm">{ticket.priority}</span>
                        </div>
                        {expandedTicket === ticket.id ? (
                          <ChevronUpIcon className="w-5 h-5 text-white/60" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-white/60" />
                        )}
                      </div>
                    </div>
                    {expandedTicket === ticket.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/10 p-4 space-y-4"
                      >
                        <div>
                          <h4 className="text-white font-medium mb-2">Description</h4>
                          <p className="text-white/60">{ticket.description}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Response</h4>
                          <p className="text-white/60">{ticket.response}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Need Help?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <QuestionMarkCircleIcon className="w-5 h-5 text-[#50a826]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">FAQs</h3>
                    <p className="text-white/60 text-sm">Check our frequently asked questions for quick answers.</p>
                    <Link href="#" className="text-[#50a826] text-sm hover:underline mt-1 inline-block">
                      View FAQs
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <QuestionMarkCircleIcon className="w-5 h-5 text-[#50a826]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Documentation</h3>
                    <p className="text-white/60 text-sm">Browse our detailed documentation and guides.</p>
                    <Link href="#" className="text-[#50a826] text-sm hover:underline mt-1 inline-block">
                      View Documentation
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <QuestionMarkCircleIcon className="w-5 h-5 text-[#50a826]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Contact Us</h3>
                    <p className="text-white/60 text-sm">Email us directly at support@example.com</p>
                    <Link href="mailto:support@example.com" className="text-[#50a826] text-sm hover:underline mt-1 inline-block">
                      Send Email
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
} 