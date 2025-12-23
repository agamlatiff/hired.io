"use client";

import type { CompanyType } from "@/app/types";
import { fetcher } from "@/lib/helpers";
import { parsingCompanies } from "@/lib/utils";
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

  const [companies, setCompanies] = useState<CompanyType[]>([]);

  const parseCompanies = useCallback(async () => {
    const parseData = await parsingCompanies(data, isLoading, error);
    setCompanies(parseData);
  }, [data, isLoading, error]);

  useEffect(() => {
    parseCompanies();
  }, [parseCompanies]);

  return {
    companies,
    mutate,
    isLoading,
  };
};

export default useCompanies;
