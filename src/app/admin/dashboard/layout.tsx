"use client";
import { AdminHeader } from "../../sections/admin/AdminHeader";
import { AdminFooter } from "../../sections/admin/AdminFooter";
import { AdminSidebar } from "../../sections/admin/AdminSidebar";
import { useState, useCallback, memo, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MemoizedHeader = memo(AdminHeader);
const MemoizedFooter = memo(AdminFooter);
const MemoizedSidebar = memo(AdminSidebar);

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  // Protect admin routes
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/dashboard");
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, router]);

  const handleSidebarCollapse = useCallback((value: boolean) => {
    setIsSidebarCollapsed(value);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isPinned) {
      setIsHovering(true);
      setIsSidebarCollapsed(false);
    }
  }, [isPinned]);

  const handleMouseLeave = useCallback(() => {
    if (!isPinned && isHovering) {
      setIsHovering(false);
      setIsSidebarCollapsed(true);
    }
  }, [isHovering, isPinned]);

  const handlePinChange = useCallback((value: boolean) => {
    setIsPinned(value);
    if (!value) {
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarCollapsed(false);
    }
  }, []);

  if (status === "loading" || !session?.user?.role) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#50a826]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MemoizedHeader />
      <div className="flex">
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <MemoizedSidebar 
            isCollapsed={isSidebarCollapsed} 
            onCollapseChange={handleSidebarCollapse}
            isHovering={isHovering}
            isPinned={isPinned}
            onPinChange={handlePinChange}
          />
        </div>
        <main 
          className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? "ml-16" : "ml-64"
          }`}
          style={{
            minHeight: "calc(100vh - 8rem)",
            padding: "2rem",
            marginTop: "64px",
          }}
        >
          <div className="w-full max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
      <MemoizedFooter />
    </div>
  );
} 