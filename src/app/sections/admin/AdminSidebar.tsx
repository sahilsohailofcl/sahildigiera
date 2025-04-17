"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, memo } from "react";
import Image from "next/image";
import { 
  HomeIcon, 
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  StarIcon,
  BookmarkIcon
} from "@heroicons/react/24/outline";

interface AdminSidebarProps {
  isCollapsed: boolean;
  onCollapseChange: (value: boolean) => void;
  isHovering: boolean;
  isPinned: boolean;
  onPinChange: (value: boolean) => void;
}

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon, color: "text-[#50a826]" },
  { name: "Users", href: "/admin/dashboard/users", icon: UsersIcon, color: "text-[#50a826]" },
  { name: "Blogs", href: "/admin/dashboard/blogs", icon: DocumentTextIcon, color: "text-[#50a826]" },
  { name: "Case Studies", href: "/admin/dashboard/case-studies", icon: ChartBarIcon, color: "text-[#50a826]" },
  { name: "Content", href: "/admin/dashboard/content", icon: DocumentTextIcon, color: "text-[#50a826]" },
  { name: "Analytics", href: "/admin/dashboard/analytics", icon: ChartBarIcon, color: "text-[#50a826]" },
  { name: "Settings", href: "/admin/dashboard/settings", icon: CogIcon, color: "text-[#50a826]" },
] as const;

const NavItem = memo(({ 
  item, 
  isActive, 
  isCollapsed,
  onClick
}: { 
  item: typeof navigation[number]; 
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}) => (
  <Link
    href={item.href}
    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
      isActive
        ? "bg-white/10 text-white"
        : "text-white/60 hover:bg-white/5 hover:text-white"
    }`}
    onClick={onClick}
  >
    <item.icon className={`w-5 h-5 ${item.color}`} />
    {!isCollapsed && <span>{item.name}</span>}
  </Link>
));

NavItem.displayName = 'NavItem';

const AdminProfile = memo(({ isCollapsed }: { isCollapsed: boolean }) => (
  <div className="p-4 border-t border-white/10">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[#317e31]/20 flex items-center justify-center">
        <ShieldCheckIcon className="w-5 h-5 text-[#50a826]" />
      </div>
      {!isCollapsed && (
        <div>
          <p className="text-white text-sm font-medium">Admin</p>
          <p className="text-white/60 text-xs">Administrator</p>
        </div>
      )}
    </div>
  </div>
));

AdminProfile.displayName = 'AdminProfile';

export function AdminSidebar({ 
  isCollapsed, 
  onCollapseChange, 
  isHovering,
  isPinned,
  onPinChange
}: AdminSidebarProps) {
  const pathname = usePathname();

  const handleNavClick = useCallback(() => {
    if (isHovering && !isPinned) {
      onPinChange(true);
    }
  }, [isHovering, isPinned, onPinChange]);

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-black border-r border-white/10 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      style={{
        zIndex: 40,
        marginTop: '64px',
        height: 'calc(100vh - 64px)',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 border-b border-white/10 relative">
          <Link href="/admin/dashboard" className="flex items-center justify-center">
            {isCollapsed ? (
              <ShieldCheckIcon className="w-8 h-8 text-[#50a826]" />
            ) : (
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-8 h-8 text-[#50a826]" />
                <span className="text-white font-bold">Admin Panel</span>
              </div>
            )}
          </Link>
          {!isCollapsed && (
            <button
              onClick={() => onPinChange(!isPinned)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/5 transition-colors"
              aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
            >
              {isPinned ? (
                <StarIcon className="w-4 h-4 text-[#50a826]" />
              ) : (
                <BookmarkIcon className="w-4 h-4 text-white/60" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavItem 
                  item={item} 
                  isActive={pathname === item.href} 
                  isCollapsed={isCollapsed}
                  onClick={handleNavClick}
                />
              </li>
            ))}
          </ul>
        </nav>

        <AdminProfile isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
} 