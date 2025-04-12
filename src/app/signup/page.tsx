"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const isValid =
    formData.name &&
    formData.email &&
    formData.company &&
    formData.password.length >= 8;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, plan: "trial" }),
      });

      if (res.ok) {
        router.push("/pricing");
      } else {
        const err = await res.json();
        alert(err.message || "Signup failed.");
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-md p-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/5 border border-white/10 relative overflow-hidden">
        {/* Neon Gradient Effect - Fixed with pointer-events-none */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(72,207,72,0.2)_0%,_transparent_80%)] animate-pulse pointer-events-none"></div>

        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#317e31] to-[#a8e063] z-10 relative">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 z-10 relative">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className="w-full p-3 border border-white/10 rounded bg-white/5 text-white focus:ring-2 focus:ring-[#50a826] outline-none backdrop-blur-sm"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              className="w-full p-3 border border-white/10 rounded bg-white/5 text-white focus:ring-2 focus:ring-[#50a826] outline-none backdrop-blur-sm"
              placeholder="you@example.com"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              required
              className="w-full p-3 border border-white/10 rounded bg-white/5 text-white focus:ring-2 focus:ring-[#50a826] outline-none backdrop-blur-sm"
              placeholder="Enter your company name"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
              minLength={8}
              className="w-full p-3 border border-white/10 rounded bg-white/5 text-white focus:ring-2 focus:ring-[#50a826] outline-none backdrop-blur-sm"
              placeholder="••••••••"
            />
            <p className="text-xs text-white/40 mt-1">Minimum 8 characters</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-3 text-white font-semibold rounded bg-gradient-to-r from-[#317e31] via-[#4CAF50] to-[#8BC34A] hover:bg-gradient-to-l hover:from-[#8BC34A] hover:to-[#317e31] transition-all duration-500 shadow-lg hover:shadow-[0_0_20px_10px_rgba(72,207,72,0.3)] animate-pulse hover:animate-none relative ${!isValid || loading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                  5.291A7.962 7.962 0 014 12H0c0 
                  3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-sm text-white/70 text-center mt-6 z-10 relative">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#a8e063] hover:underline hover:text-[#cfff89]"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}