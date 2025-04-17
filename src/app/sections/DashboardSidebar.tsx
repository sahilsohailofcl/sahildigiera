"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, memo } from "react";
import Image from "next/image";
import Logo from "../assets/SahilDigiEraLogo.png";
import { 
  HomeIcon, 
  FolderIcon, 
  CreditCardIcon, 
  QuestionMarkCircleIcon, 
  CogIcon,
  FlagIcon,
  StarIcon,
  BookmarkIcon
} from "@heroicons/react/24/outline";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onCollapseChange: (value: boolean) => void;
  isHovering: boolean;
  isPinned: boolean;
  onPinChange: (value: boolean) => void;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, color: "text-[#50a826]" },
  { name: "Projects", href: "/dashboard/projects", icon: FolderIcon, color: "text-[#50a826]" },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCardIcon, color: "text-[#50a826]" },
  { name: "Support", href: "/dashboard/support", icon: QuestionMarkCircleIcon, color: "text-[#50a826]" },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon, color: "text-[#50a826]" },
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

const UserProfile = memo(({ isCollapsed }: { isCollapsed: boolean }) => (
  <div className="p-4 border-t border-white/10">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
        <span className="text-white text-sm">JD</span>
      </div>
      {!isCollapsed && (
        <div>
          <p className="text-white text-sm font-medium">John Doe</p>
          <p className="text-white/60 text-xs">john@example.com</p>
        </div>
      )}
    </div>
  </div>
));

UserProfile.displayName = 'UserProfile';

export function DashboardSidebar({ 
  isCollapsed, 
  onCollapseChange, 
  isHovering,
  isPinned,
  onPinChange
}: DashboardSidebarProps) {
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
          <Link href="/dashboard" className="flex items-center justify-center">
            {isCollapsed ? (
              <FlagIcon className="w-8 h-8 text-[#50a826]" />
            ) : (
              <div className="w-full h-8 relative">
                <Image
                  src={Logo}
                  alt="Sahil DigiEra"
                  width={200}
                  height={32}
                  style={{ objectFit: 'contain' }}
                  priority
                />
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

        <UserProfile isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
} 