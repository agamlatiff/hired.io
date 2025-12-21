"use client";

import useFeaturedJobs from "@/hooks/useFeaturedJobs";
import TitleSection from "./TitleSection";
import type { JobType } from "@/app/types";
import LatestJobItem from "./LatestJobItem";

const LatestJobsSkeleton = () => (
  <div className="mt-12 grid grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg" />
        <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
        <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
      </div>
    ))}
  </div>
);

const LatestJobs = () => {
  const { jobs, isLoading, error } = useFeaturedJobs();

  if (error) {
    return (
      <div className="py-16 mt-32 mb-10 relative">
        <TitleSection word1="Latest" word2="jobs open" />
        <div className="mt-12 text-center text-gray-500">
          Failed to load jobs. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 mt-32 mb-10 relative">
      <TitleSection word1="Latest" word2="jobs open" />
      {isLoading ? (
        <LatestJobsSkeleton />
      ) : (
        <div className="mt-12 grid grid-cols-3 gap-8">
          {jobs.map((item: JobType) => (
            <LatestJobItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
