// src/app/admin/dashboard/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    // Get the current host dynamically
    const host = window.location.origin;
    
    await signOut({
      callbackUrl: `${host}/login`, // Use dynamic host
      redirect: true // Let NextAuth handle the redirect
    });
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