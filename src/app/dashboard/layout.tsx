"use client";
import { DashboardHeader } from "../sections/DashboardHeader";
import { DashboardFooter } from "../sections/DashboardFooter";
import { DashboardSidebar } from "../sections/DashboardSidebar";
import { useState, useCallback, memo, useEffect } from "react";

const MemoizedHeader = memo(DashboardHeader);
const MemoizedFooter = memo(DashboardFooter);
const MemoizedSidebar = memo(DashboardSidebar);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

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