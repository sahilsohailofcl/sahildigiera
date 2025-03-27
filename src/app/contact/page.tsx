"use client"; // This tells Next.js to treat this component as a Client Component

import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Help() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
  
    try {
      const response = await fetch('/api/people/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('success');
      } else {
        // Handle API errors (including the "duplicate" case we now treat as success)
        setSubmitStatus(data.error ? 'success' : 'error');
      }
    } catch (error) {
      console.error('Error adding client:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-black text-white p-6">
        <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg backdrop-blur-md bg-white/5 border border-white/10 relative overflow-hidden">
          {/* Neon Glow Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(49,126,49,0.2)_0%,_transparent_70%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,224,99,0.1)_0%,_transparent_70%)] animate-pulse delay-1000"></div>

          <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#317e31] to-[#a8e063] relative z-10">
            Contact Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#317e31]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Email</h2>
                  <a
                    href="mailto:Hello@sahildigiera.com"
                    className="text-sm text-gray-300 hover:text-[#317e31] transition duration-300"
                  >
                    Hello@sahildigiera.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#317e31]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Phone</h2>
                  <a
                    href="tel:+447737255758"
                    className="text-sm text-gray-300 hover:text-[#317e31] transition duration-300"
                  >
                    +44 7737 255758
                  </a>
                </div>
              </div>

              {/* Schedule a Meeting Button */}
              <div className="pt-8">
                <a
                  href="https://calendly.com/sahildigiera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block py-3 text-white font-semibold text-center rounded-lg transition-all duration-500 bg-gradient-to-r from-[#317e31] via-[#4CAF50] to-[#8BC34A] hover:bg-gradient-to-l hover:from-[#8BC34A] hover:via-[#4CAF50] hover:to-[#317e31] animate-gradient-x relative overflow-hidden group shadow-lg hover:shadow-[0_0_20px_10px_rgba(72,207,72,0.4)] animate-pulse hover:animate-none"
                >
                  <span className="relative z-10">Schedule a Meeting</span>
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-white/10 rounded bg-white/5 text-white focus:ring-2 focus:ring-[#317e31] outline-none backdrop-blur-sm"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-white/10 rounded bg-white/5 text-white focus:ring-2 focus:ring-[#317e31] outline-none backdrop-blur-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    autoComplete="off"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 border border-white/10 rounded bg-white/5 text-white focus:ring-2 focus:ring-[#317e31] outline-none backdrop-blur-sm"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#317e31] hover:bg-[#2a6c2a] text-white font-semibold rounded transition duration-300 relative"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    </span>
                  ) : (
                    'Submit Message'
                  )}
                </button>
                {submitStatus === 'success' && (
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-sm rounded-lg">
                    Message sent successfully!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
                    Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}