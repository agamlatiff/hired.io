"use client";

import useFeaturedJobs from "@/hooks/useFeaturedJobs";
import TitleSection from "./TitleSection";
import type { JobType } from "@/app/types";
import LatestJobItem from "./LatestJobItem";

const LatestJobs = () => {
  const { jobs, isLoading, error } = useFeaturedJobs();

  return (
    <div className="py-16 mt-32 mb-10 relative">
      <TitleSection word1="Latest" word2="jobs open" />
      <div className="mt-12 grid grid-cols-3 gap-8">
        {jobs.map((item: JobType) => (
          <LatestJobItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
