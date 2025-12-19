import TitleSection from "./TitleSection";
import JobItem from "./JobItem";
import type { JobType } from "@/app/types";
import useFeaturedJobs from "@/hooks/useFeaturedJobs";

const FeaturedJobs = () => {
  const { jobs, isLoading, error } = useFeaturedJobs()

  return (
    <div className="mt-32 mb-10">
      <TitleSection word1="Featured" word2="jobs" />
      <div className="grid grid-cols-4 gap-8  mt-12">
        {jobs.map((item: JobType) => (
          <JobItem {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;
