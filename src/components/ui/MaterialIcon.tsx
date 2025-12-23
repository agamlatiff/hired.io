"use client";

import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

interface MaterialIconProps {
  icon: string;
  className?: string;
  fill?: boolean;
  weight?: number;
}

const MaterialIcon: FC<MaterialIconProps> = ({
  icon,
  className,
  fill = false,
  weight = 400,
}) => {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}`,
      }}
    >
      {icon}
    </span>
  );
};

export default MaterialIcon;
