
import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  pulse?: boolean;
  // Added className property to BadgeProps to allow custom styling
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', icon, pulse, className = '' }) => {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    danger: "bg-rose-50 text-rose-700 border-rose-100",
    info: "bg-blue-50 text-blue-700 border-blue-100",
    neutral: "bg-slate-50 text-slate-600 border-slate-100"
  };

  const pulseStyles = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    info: "bg-blue-500",
    neutral: "bg-slate-400"
  };

  return (
    // Integrated className into the component's style list
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${styles[variant]} ${className}`}>
      {pulse && (
        <span className="relative flex h-2 w-2 mr-1.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseStyles[variant]}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseStyles[variant]}`}></span>
        </span>
      )}
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
