"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg backdrop-blur-md bg-white/5 border border-white/10 relative overflow-hidden">
        {/* Neon Glow Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(49,126,49,0.2)_0%,_transparent_70%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,224,99,0.1)_0%,_transparent_70%)] animate-pulse delay-1000"></div>

        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#317e31] to-[#a8e063] relative z-10">
          Admin Login
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-white/10 rounded bg-white/5 text-white focus:ring-2 focus:ring-[#317e31] outline-none backdrop-blur-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-white/10 rounded bg-white/5 text-white focus:ring-2 focus:ring-[#317e31] outline-none backdrop-blur-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded transition-all duration-500 bg-gradient-to-r from-[#317e31] via-[#4CAF50] to-[#8BC34A] hover:bg-gradient-to-l hover:from-[#8BC34A] hover:via-[#4CAF50] hover:to-[#317e31] animate-gradient-x relative overflow-hidden group shadow-lg hover:shadow-[0_0_20px_10px_rgba(72,207,72,0.4)] animate-pulse hover:animate-none"
          >
            <span className="relative z-10">Login</span>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </button>
        </form>
      </div>
    </div>
  );
}