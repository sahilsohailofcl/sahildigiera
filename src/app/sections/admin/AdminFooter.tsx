"use client";
import Link from "next/link";
import { memo } from "react";

const adminLinks = [
  { href: "/admin/dashboard/logs", label: "System Logs" },
  { href: "/admin/dashboard/help", label: "Admin Help" },
  { href: "/admin/dashboard/status", label: "System Status" }
] as const;

const FooterLink = memo(({ href, label }: { href: string; label: string }) => (
  <Link 
    href={href}
    className="text-sm text-white/60 hover:text-white transition-colors"
  >
    {label}
  </Link>
));

FooterLink.displayName = 'FooterLink';

export function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/60 text-sm">
            © {currentYear} DigiEra Admin Panel. All rights reserved.
          </p>
          <div className="flex gap-4">
            {adminLinks.map((link) => (
              <FooterLink 
                key={link.href}
                href={link.href}
                label={link.label}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 