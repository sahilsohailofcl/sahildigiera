"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      // Get the user's role from the session
      const session = await fetch('/api/auth/session').then(res => res.json());
      if (session?.user?.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-md p-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/5 border border-white/10 relative overflow-hidden">
        {/* Neon Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(72,207,72,0.2)_0%,_transparent_80%)] animate-pulse"></div>

        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#317e31] to-[#a8e063] z-10 relative">
          Welcome Back
        </h1>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4 z-10 relative">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 z-10 relative">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-white/10 rounded bg-white/5 text-white focus:ring-2 focus:ring-[#50a826] outline-none backdrop-blur-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-white/10 rounded bg-white/5 text-white focus:ring-2 focus:ring-[#50a826] outline-none backdrop-blur-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded bg-gradient-to-r from-[#317e31] via-[#4CAF50] to-[#8BC34A] hover:bg-gradient-to-l hover:from-[#8BC34A] hover:to-[#317e31] transition-all duration-500 shadow-lg hover:shadow-[0_0_20px_10px_rgba(72,207,72,0.3)] animate-pulse hover:animate-none relative"
          >
            Login
          </button>

          <p className="text-sm text-white/70 text-center mt-4">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#a8e063] hover:underline hover:text-[#cfff89]"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
