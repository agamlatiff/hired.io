import { cn } from "@/lib/utils";
import type { FC } from "react";

interface TechBadgeProps {
  label: string;
  variant?: "default" | "primary" | "purple" | "blue" | "orange" | "yellow";
  size?: "sm" | "md";
}

const TechBadge: FC<TechBadgeProps> = ({
  label,
  variant = "default",
  size = "md",
}) => {
  const baseStyles =
    "shrink-0 rounded-full font-mono border transition-colors";

  const variantStyles = {
    default: "bg-accent-dark text-gray-300 border-white/5",
    primary: "bg-neon-green/10 text-neon-green border-neon-green/20",
    purple: "bg-neon-purple/10 text-neon-purple border-neon-purple/20",
    blue: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}>
      {label}
    </span>
  );
};

export default TechBadge;
