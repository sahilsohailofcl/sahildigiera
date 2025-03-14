// src/app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth"; // Import from lib/auth.ts
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton"; // Import the Client Component

export default async function AdminDashboard() {
  // Fetch the session
  const session = await getServerSession(authOptions);

  // Redirect if the user is not authenticated
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left Navigation Bar */}
      <div className="w-64 p-6 bg-black/90 border-r border-white/10">
        <h2 className="text-2xl font-bold mb-8 text-[#317e31]">Admin Panel</h2>
        <nav className="space-y-4">
          <Link
            href="/admin/dashboard"
            className="block py-2 px-4 rounded-lg hover:bg-white/10 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/admin/dashboard/blogs"
            className="block py-2 px-4 rounded-lg hover:bg-white/10 transition duration-300"
          >
            Blogs
          </Link>
        </nav>
        <div className="mt-8">
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <p className="text-lg">Welcome to the admin panel!</p>
      </div>
    </div>
  );
}