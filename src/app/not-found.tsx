// app/not-found.tsx
'use client';

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Bouncing animation for doodles
    const doodles = containerRef.current?.querySelectorAll<HTMLDivElement>('.doodle');
    doodles?.forEach(doodle => {
      const duration = Math.random() * 6 + 4;
      const delay = Math.random() * 2;
      const distance = Math.random() * 20 + 10;
      
      doodle.style.setProperty('--duration', `${duration}s`);
      doodle.style.setProperty('--delay', `${delay}s`);
      doodle.style.setProperty('--distance', `${distance}px`);
    });
  }, []);

  return (
    <div 
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 overflow-hidden relative"
      ref={containerRef}
    >
      {/* Floating doodle elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circle doodles */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`circle-${i}`}
            className="doodle absolute rounded-full border-2 border-[#317e31] opacity-30"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Squiggly lines */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={`line-${i}`}
            className="doodle absolute opacity-20"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: '2px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(90deg, transparent, #317e31, transparent)`
            }}
          />
        ))}

        {/* Plus signs */}
        {[...Array(4)].map((_, i) => (
          <div 
            key={`plus-${i}`}
            className="doodle absolute opacity-40 text-[#317e31]"
            style={{
              fontSize: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            +
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl text-center">
        <div className="mb-8 relative inline-block">
          <h1 className="text-8xl md:text-9xl font-bold text-[#317e31] relative z-10">
            4
            <span className="inline-block animate-wiggle origin-bottom">0</span>
            4
          </h1>
          <div className="absolute -inset-4 bg-[#317e31]/10 rounded-full blur-md" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Oops! Lost in the <span className="text-[#317e31]">Creative Void</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto">
          The page you're looking for has gone on an adventure. 
          Maybe it's time for you to explore too!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/" 
            className="btn-home relative overflow-hidden group px-6 py-3 rounded-full font-medium transition-all duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              Take Me Home
            </span>
            <span className="absolute inset-0 bg-[#317e31] rounded-full transform group-hover:scale-105 transition-transform duration-300" />
          </Link>

          <Link 
            href="/blogs" 
            className="btn-explore relative overflow-hidden group px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 border-[#317e31]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              Explore More
            </span>
            <span className="absolute inset-0 bg-[#317e31]/10 rounded-full transform group-hover:scale-105 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Animated character */}
      <div className="absolute bottom-8 right-8 w-24 h-24 md:w-32 md:h-32">
        <div className="relative w-full h-full animate-bounce-slow">
          <div className="absolute w-full h-full rounded-full bg-[#317e31]/20"></div>
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-[#317e31]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/4 rounded-full bg-[#317e31]"></div>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(var(--distance)); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-wiggle {
          animation: wiggle 1.5s ease-in-out infinite;
          display: inline-block;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .doodle {
          animation: float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
        .btn-home {
          background: black;
          color: white;
          border: 2px solid #317e31;
        }
        .btn-home span:first-child {
          background: black;
          padding: 0 4px;
        }
        .btn-explore {
          background: transparent;
          color: #317e31;
        }
        .btn-home:hover {
          color: white;
        }
        .btn-explore:hover {
          color: #317e31;
          background: rgba(49, 126, 49, 0.05);
        }
      `}</style>
    </div>
  );
}