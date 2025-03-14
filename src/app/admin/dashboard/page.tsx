// src/app/admin/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../../../.././lib/auth"; // Import from lib/auth.ts
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton"; // Import the Client Component

export default async function AdminDashboard() {
  // Fetch the session
  const session = await getServerSession(authOptions);

  // Redirect if the user is not authenticated
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg backdrop-blur-md bg-white/5 border border-white/10">
        <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
        <p className="text-center">Welcome to the admin panel!</p>
        <LogoutButton /> {/* Use the Client Component */}
      </div>
    </div>
  );
}