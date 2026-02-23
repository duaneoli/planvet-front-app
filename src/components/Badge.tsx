import React from "react";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  pulse?: boolean;
  // Added className property to BadgeProps to allow custom styling
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  icon,
  pulse,
  className = "",
}) => {
  return (
    // Integrated className into the component's style list
    <div className={`badge badge-outline badge-${variant} ${className}`}>
      {pulse && (
        <span className="relative flex h-2 w-2 mr-1.5">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-${variant}`}
          ></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 bg-${variant}`}></span>
        </span>
      )}
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  );
};

export default Badge;
