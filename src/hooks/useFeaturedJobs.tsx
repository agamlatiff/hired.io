"use client";

import type { JobType } from "@/app/types";
import { fetcher, parsingJobs } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

const useFeaturedJobs = () => {
  const { data, isLoading, error } = useSWR("/api/jobs/featured", fetcher);

  const [jobs, setJobs] = useState<JobType[]>([]);

  const parseJobs = useCallback(async () => {
    const parseData = await parsingJobs(data, isLoading, error);
    setJobs(parseData);
  }, [data, isLoading, error]);

  useEffect(() => {
    parseJobs();
  }, [data, isLoading, error]);


  return {
    jobs, isLoading, error
  }
};

export default useFeaturedJobs;
