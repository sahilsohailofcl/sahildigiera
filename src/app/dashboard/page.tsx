"use client";
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, {session?.user?.name || 'User'}!
        </h1>
        <p className="text-white/60">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Projects */}
        <Link href="/dashboard/projects">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/60 text-sm">Active Projects</h3>
              <div className="w-10 h-10 rounded-full bg-[#317e31]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#50a826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white">3</p>
            <p className="text-sm text-white/60 mt-2">2 in progress</p>
          </div>
        </Link>

        {/* Current Plan */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/60 text-sm">Current Plan</h3>
            <div className="w-10 h-10 rounded-full bg-[#317e31]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#50a826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-white">Growth</p>
          <p className="text-sm text-white/60 mt-2">Monthly billing</p>
        </div>

        {/* Support Tickets */}
        <Link href="/dashboard/support">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/60 text-sm">Support Tickets</h3>
              <div className="w-10 h-10 rounded-full bg-[#317e31]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#50a826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white">1</p>
            <p className="text-sm text-white/60 mt-2">Open ticket</p>
          </div>
        </Link>

        {/* Next Payment */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/60 text-sm">Next Payment</h3>
            <div className="w-10 h-10 rounded-full bg-[#317e31]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#50a826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-white">$499</p>
          <p className="text-sm text-white/60 mt-2">Due in 15 days</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              title: "Website Redesign",
              status: "In Progress",
              date: "2 days ago",
              progress: 65
            },
            {
              title: "SEO Optimization",
              status: "Completed",
              date: "1 week ago",
              progress: 100
            },
            {
              title: "Content Marketing",
              status: "Planning",
              date: "2 weeks ago",
              progress: 30
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h3 className="text-white font-medium">{activity.title}</h3>
                <p className="text-sm text-white/60">{activity.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#50a826] rounded-full"
                    style={{ width: `${activity.progress}%` }}
                  />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  activity.status === "Completed" 
                    ? "bg-green-500/20 text-green-500" 
                    : activity.status === "In Progress"
                    ? "bg-blue-500/20 text-blue-500"
                    : "bg-yellow-500/20 text-yellow-500"
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/projects/new">
          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#317e31]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#50a826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-white font-medium">New Project</h3>
              <p className="text-sm text-white/60">Start a new project request</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/schedule">
          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#317e31]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#50a826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-white font-medium">Schedule Call</h3>
              <p className="text-sm text-white/60">Book a consultation</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/support">
          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#317e31]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#50a826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-white font-medium">Contact Support</h3>
              <p className="text-sm text-white/60">Get help from our team</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}