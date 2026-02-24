import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  isOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

const SidebarItem: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}> = ({ to, icon, label, active, collapsed, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
      active
        ? "bg-azul-600 text-white shadow-lg shadow-azul-200"
        : "text-slate-600 hover:bg-azul-50 hover:text-azul-600"
    } ${collapsed ? "justify-center space-x-0" : ""}`}
    title={collapsed ? label : ""}
  >
    <div className={`${active ? "text-white" : "text-slate-500 group-hover:text-azul-600"}`}>
      {icon}
    </div>
    {!collapsed && <span className="font-medium whitespace-nowrap overflow-hidden">{label}</span>}
  </Link>
);

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  isOpen,
  onToggleCollapse,
  onCloseMobile,
}) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "lg:w-20" : "lg:w-64"}
      `}
      >
        <div className="flex flex-col h-full p-4">
          <div
            className={`flex items-center mb-8 transition-all ${isCollapsed ? "justify-center" : "px-2 space-x-2"}`}
          >
            <div className="p-2 rounded-xl text-white ">
              <img src={"planvet-logo.png"} className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <h1 className="text-xl font-bold tracking-tight text-slate-800">PlanVET</h1>
            )}
          </div>

          <nav className="flex-1 space-y-2">
            {/* <SidebarItem
              to="/"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active={location.pathname === "/"}
              collapsed={isCollapsed}
              onClick={onCloseMobile}
            /> */}
            {/* <SidebarItem
              to="/pets"
              icon={<Dog size={20} />}
              label="Meus Pets"
              active={location.pathname.startsWith("/pets")}
              collapsed={isCollapsed}
              onClick={onCloseMobile}
            /> */}
            {/* <SidebarItem
              to="/contracts"
              icon={<ClipboardList size={20} />}
              label="Contratos"
              active={location.pathname === "/contracts"}
              collapsed={isCollapsed}
              onClick={onCloseMobile}
            /> */}
            <SidebarItem
              to="/invoices"
              icon={<CreditCard size={20} />}
              label="Financeiro"
              active={location.pathname === "/invoices"}
              collapsed={isCollapsed}
              onClick={onCloseMobile}
            />
          </nav>

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center p-3 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors mt-auto"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <div className="flex items-center space-x-3 w-full">
                <ChevronLeft size={20} />
                <span className="text-sm font-medium">Recuar Menu</span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
