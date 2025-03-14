"use client"; // Mark this as a Client Component

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="mt-6 w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition duration-300"
    >
      Logout
    </button>
  );
}