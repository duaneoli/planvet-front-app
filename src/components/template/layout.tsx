import Header from "@/components/template/Header";
import Sidebar from "@/components/template/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        isOpen={isSidebarOpen}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 overflow-y-auto relative">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
        <div className="max-w-6xl mx-auto p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
