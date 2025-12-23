import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  rounded?: "default" | "lg" | "xl" | "full" | "2xl" | "3xl";
}

const roundedStyles = {
  default: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  "2xl": "rounded-[2rem]",
  "3xl": "rounded-[3rem]",
  full: "rounded-full",
};

const GlassPanel: FC<GlassPanelProps> = ({
  children,
  className,
  rounded = "xl",
}) => {
  return (
    <div className={cn("glass-panel", roundedStyles[rounded], className)}>
      {children}
    </div>
  );
};

export default GlassPanel;
