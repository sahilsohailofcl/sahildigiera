// src/app/admin/dashboard/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Get the current host dynamically
    const host = window.location.origin;
    
    // First sign out through NextAuth
    await signOut({ redirect: false });
    
    // Then manually redirect to login with full URL
    window.location.href = `${host}/login`;
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition duration-300"
    >
      Logout
    </button>
  );
}