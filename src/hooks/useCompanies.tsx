"use client";

import type { JobType } from "@/app/types";
import { fetcher, parsingCompanies } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const COMPANY_PATH = "/api/companies/filter";

const useCompanies = (filter?: string[]) => {
  const paramsCategory = useMemo(() => {
    if (filter && filter.length > 0) {
      return filter.join(",");
    }

    return "";
  }, [filter]);

  const { data, error, isLoading, mutate } = useSWR(
    `${COMPANY_PATH}?category=${paramsCategory}`,
    fetcher,
    { revalidateOnMount: false }
  );

  const [companies, setCompanies] = useState<JobType[]>([]);

  const parseJobs = useCallback(async () => {
    const parseData = await parsingCompanies(data, isLoading, error);

    setCompanies(parseData);
  }, [data, isLoading, error]);

  useEffect(() => {
    parseJobs();
  }, [data, isLoading, error]);

  return {
    companies,
    mutate,
    isLoading,
  };
};

export default useCompanies;
