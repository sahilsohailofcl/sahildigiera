"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const policyLinks = [
  { href: "/dashboard/privacy", label: "Privacy Policy" },
  { href: "/dashboard/terms", label: "Terms of Service" },
  { href: "/dashboard/cookies", label: "Cookie Policy" }
] as const;

const FooterLink = memo(({ 
  href, 
  label, 
  isActive 
}: { 
  href: string; 
  label: string; 
  isActive: boolean;
}) => (
  <Link 
    href={href}
    className={`text-sm transition-colors ${
      isActive 
        ? "text-white" 
        : "text-white/60 hover:text-white"
    }`}
  >
    {label}
  </Link>
));

FooterLink.displayName = 'FooterLink';

export function DashboardFooter() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/60 text-sm">
            © {currentYear} DigiEra. All rights reserved.
          </p>
          <div className="flex gap-4">
            {policyLinks.map((link) => (
              <FooterLink 
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 