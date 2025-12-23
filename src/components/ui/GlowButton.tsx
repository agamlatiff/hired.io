import { cn } from "@/lib/utils";
import type { FC, ButtonHTMLAttributes, ReactNode } from "react";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const GlowButton: FC<GlowButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseStyles =
    "font-bold rounded-full transition-all active:scale-95 disabled:opacity-50";

  const variantStyles = {
    primary:
      "bg-neon-green hover:bg-[#3cd612] text-background-dark shadow-[0_0_15px_rgba(73,230,25,0.3)] hover:shadow-[0_0_25px_rgba(73,230,25,0.5)]",
    secondary:
      "bg-neon-purple hover:bg-[#8f4ae6] text-white shadow-[0_0_15px_rgba(162,89,255,0.3)] hover:shadow-[0_0_25px_rgba(162,89,255,0.5)]",
    outline:
      "bg-accent-dark hover:bg-white/10 text-white border border-white/10 hover:border-white/20",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlowButton;
