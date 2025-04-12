"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition duration-300"
    >
      Logout
    </button>
  );
} 