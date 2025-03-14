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
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg backdrop-blur-md bg-white/5 border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
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
            className="w-full py-3 bg-[#317e31] hover:bg-[#2a6c2a] text-white font-semibold rounded transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}