"use client";
import { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active", lastLogin: "2 hours ago" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active", lastLogin: "1 day ago" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User", status: "Inactive", lastLogin: "1 week ago" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "User", status: "Active", lastLogin: "3 days ago" },
  { id: 5, name: "Tom Brown", email: "tom@example.com", role: "User", status: "Suspended", lastLogin: "2 weeks ago" },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#50a826] text-white rounded-lg hover:bg-[#317e31] transition-colors">
          <PlusIcon className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#50a826]"
          />
        </div>
        <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#50a826]">
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#50a826]">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/60">Name</th>
              <th className="text-left p-4 text-white/60">Email</th>
              <th className="text-left p-4 text-white/60">Role</th>
              <th className="text-left p-4 text-white/60">Status</th>
              <th className="text-left p-4 text-white/60">Last Login</th>
              <th className="text-right p-4 text-white/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-white/10 last:border-0">
                <td className="p-4 text-white">{user.name}</td>
                <td className="p-4 text-white">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.role === "Admin" 
                      ? "bg-[#317e31]/20 text-[#50a826]"
                      : "bg-blue-500/20 text-blue-500"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.status === "Active"
                      ? "bg-[#317e31]/20 text-[#50a826]"
                      : user.status === "Inactive"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-red-500/20 text-red-500"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-white/60">{user.lastLogin}</td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <button 
                      className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      title="Edit user"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors"
                      title="Delete user"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-white/60">Showing {filteredUsers.length} of {mockUsers.length} users</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 