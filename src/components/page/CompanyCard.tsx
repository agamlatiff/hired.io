"use client";

import Image from "next/image";
import type { FC } from "react";
import type { CompanyType } from "@/app/types";
import { useRouter } from "next/navigation";
import GlassPanel from "../ui/GlassPanel";
import TechBadge from "../ui/TechBadge";
import MaterialIcon from "../ui/MaterialIcon";

interface CompanyCardProps extends CompanyType {
  badges?: string[];
  fundingStage?: string;
}

const CompanyCard: FC<CompanyCardProps> = ({
  industry,
  description,
  image,
  name,
  totalJobs,
  id,
  badges = [],
  fundingStage,
}) => {
  const router = useRouter();

  return (
    <GlassPanel
      rounded="xl"
      className="p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
    >
      {/* Hover Arrow */}
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <MaterialIcon icon="arrow_outward" className="text-neon-green" />
      </div>

      {/* Logo & Company Info */}
      <div
        className="flex items-center gap-4 mb-4"
        onClick={() => router.push("/detail/company/" + id)}
      >
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">{name}</h3>
          <p className="text-xs text-gray-400">{industry}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {badges.length > 0 ? (
          badges.map((badge, i) => (
            <TechBadge key={i} label={badge} variant="primary" size="sm" />
          ))
        ) : (
          <>
            <TechBadge label="REMOTE" variant="primary" size="sm" />
            {fundingStage && (
              <TechBadge label={fundingStage} variant="default" size="sm" />
            )}
          </>
        )}
      </div>

      {/* Stats */}
      <div className="pt-4 border-t border-white/5 flex justify-between items-center">
        <span className="text-sm text-gray-400">{totalJobs} Open Roles</span>
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-gray-700 border border-card-dark" />
          <div className="w-6 h-6 rounded-full bg-gray-600 border border-card-dark" />
          <div className="w-6 h-6 rounded-full bg-gray-500 border border-card-dark flex items-center justify-center text-[8px]">
            +{Math.max(0, totalJobs - 2)}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

export default CompanyCard;
