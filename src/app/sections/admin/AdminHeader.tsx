"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const AdminMenu = memo(({ 
  isOpen, 
  onClose, 
  onSignOut,
  userName,
  userInitial
}: { 
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  userName?: string | null;
  userInitial: string;
}) => (
  <div className="relative">
    <button 
      onClick={onClose}
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      aria-label="Admin menu"
    >
      <div className="w-8 h-8 rounded-full bg-[#317e31]/20 flex items-center justify-center">
        <span className="text-[#50a826] font-medium">
          {userInitial}
        </span>
      </div>
      <span className="text-sm text-white hidden md:inline">
        {userName} (Admin)
      </span>
      <ChevronDownIcon 
        className={`w-4 h-4 text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
      />
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-black border border-white/10 rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
        <Link
          href="/admin/dashboard/profile"
          className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          Admin Profile
        </Link>
        <Link
          href="/admin/dashboard/settings"
          className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          System Settings
        </Link>
        <Link
          href="/dashboard"
          className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          Switch to User View
        </Link>
        <div className="border-t border-white/10 my-1"></div>
        <button
          onClick={onSignOut}
          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors"
        >
          Sign Out
        </button>
      </div>
    )}
  </div>
));

AdminMenu.displayName = 'AdminMenu';

export function AdminHeader() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleSignOut = useCallback(async () => {
    setIsOpen(false);
    await signOut({ 
      callbackUrl: '/',
      redirect: true
    });
  }, []);

  return (
    <header className="bg-black border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between" ref={dropdownRef}>
          <div className="flex items-center gap-2">
            <span className="text-[#50a826] font-bold">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Admin Notifications"
            >
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#50a826] rounded-full"></span>
            </button>

            <AdminMenu
              isOpen={isOpen}
              onClose={() => setIsOpen(!isOpen)}
              onSignOut={handleSignOut}
              userName={session?.user?.name}
              userInitial={session?.user?.name?.[0] || "A"}
            />
          </div>
        </div>
      </div>
    </header>
  );
} 