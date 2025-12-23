"use client";

import type { JobType } from "@/app/types";
import Image from "next/image";
import type { FC } from "react";
import { useRouter } from "next/navigation";
import TechBadge from "../ui/TechBadge";
import MaterialIcon from "../ui/MaterialIcon";

interface JobCardProps extends JobType {
  salary?: string;
  salaryType?: string;
  featured?: boolean;
}

const JobCard: FC<JobCardProps> = ({
  skills,
  image,
  location,
  name,
  type,
  id,
  salary,
  salaryType = "Salary",
  featured = false,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/detail/job/" + id)}
      className={`glow-box group relative bg-card-dark border ${featured ? "border-neon-green/50" : "border-accent-dark"
        } hover:border-neon-green/50 rounded-full p-3 pr-8 transition-all duration-300 flex flex-col md:flex-row items-center gap-6 cursor-pointer`}
    >
      {/* Company Logo & Info */}
      <div className="flex items-center gap-4 w-full md:w-auto pl-3">
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-white group-hover:text-neon-green transition-colors">
            {name}
          </h3>
          <span className="text-sm text-gray-400">
            {type} • {location}
          </span>
        </div>
      </div>

      {/* Tech Stack Badges */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto md:flex-1 md:justify-center px-4">
        {skills?.slice(0, 3).map((skill: string, i: number) => (
          <TechBadge key={i} label={skill} />
        ))}
      </div>

      {/* Salary & Action */}
      <div className="flex items-center justify-between w-full md:w-auto gap-8 pl-4 md:pl-0 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
        <div className="flex flex-col items-end">
          <span className="text-neon-green font-bold text-lg glow-text">
            {salary || "$100k - $150k"}
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            {salaryType}
          </span>
        </div>
        <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-neon-green group-hover:text-black transition-colors shrink-0">
          <MaterialIcon icon="arrow_forward" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
