"use client";
import { useSession } from "next-auth/react";
import {
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

export default function AdminDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome, {session?.user?.name || 'Admin'}
        </h1>
        <p className="text-white/60">
          Here's an overview of your system's current status.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/60 text-sm">Total Users</h3>
            <div className="w-10 h-10 rounded-full bg-[#317e31]/20 flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-[#50a826]" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">1,234</p>
          <p className="text-sm text-white/60 mt-2">+12 this week</p>
        </div>

        {/* Content Items */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/60 text-sm">Content Items</h3>
            <div className="w-10 h-10 rounded-full bg-[#317e31]/20 flex items-center justify-center">
              <DocumentTextIcon className="w-5 h-5 text-[#50a826]" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">567</p>
          <p className="text-sm text-white/60 mt-2">Last updated 2h ago</p>
        </div>

        {/* System Status */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/60 text-sm">System Status</h3>
            <div className="w-10 h-10 rounded-full bg-[#317e31]/20 flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5 text-[#50a826]" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">Healthy</p>
          <p className="text-sm text-white/60 mt-2">All systems operational</p>
        </div>

        {/* Active Sessions */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/60 text-sm">Active Sessions</h3>
            <div className="w-10 h-10 rounded-full bg-[#317e31]/20 flex items-center justify-center">
              <ChartBarIcon className="w-5 h-5 text-[#50a826]" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">89</p>
          <p className="text-sm text-white/60 mt-2">Current active users</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">System Alerts</h2>
        <div className="space-y-4">
          {[
            {
              title: "New User Registration Spike",
              status: "Warning",
              date: "5 minutes ago",
              icon: ExclamationTriangleIcon,
              color: "text-yellow-500"
            },
            {
              title: "Database Backup Completed",
              status: "Success",
              date: "1 hour ago",
              icon: CheckCircleIcon,
              color: "text-[#50a826]"
            },
            {
              title: "System Update Available",
              status: "Info",
              date: "2 hours ago",
              icon: ShieldCheckIcon,
              color: "text-blue-500"
            }
          ].map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full bg-black/20 flex items-center justify-center ${alert.color}`}>
                  <alert.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{alert.title}</h3>
                  <p className="text-sm text-white/60">{alert.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                alert.status === "Warning" 
                  ? "bg-yellow-500/20 text-yellow-500"
                  : alert.status === "Success"
                  ? "bg-[#317e31]/20 text-[#50a826]"
                  : "bg-blue-500/20 text-blue-500"
              }`}>
                {alert.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 rounded-full bg-[#317e31]/20 flex items-center justify-center">
            <UsersIcon className="w-6 h-6 text-[#50a826]" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-medium">Manage Users</h3>
            <p className="text-sm text-white/60">View and edit user accounts</p>
          </div>
        </button>

        <button className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 rounded-full bg-[#317e31]/20 flex items-center justify-center">
            <DocumentTextIcon className="w-6 h-6 text-[#50a826]" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-medium">Content Manager</h3>
            <p className="text-sm text-white/60">Update site content</p>
          </div>
        </button>

        <button className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 rounded-full bg-[#317e31]/20 flex items-center justify-center">
            <ChartBarIcon className="w-6 h-6 text-[#50a826]" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-medium">View Analytics</h3>
            <p className="text-sm text-white/60">Check system metrics</p>
          </div>
        </button>
      </div>
    </div>
  );
} 