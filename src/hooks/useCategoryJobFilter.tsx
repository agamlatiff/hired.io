"use client";

import type { filterFormType } from "@/app/types";
import { fetcher, parsingCategoriesToOptions } from "@/lib/utils";
import { useMemo } from "react";
import useSWR from "swr";

const useCategoryJobFilter = () => {
  const { data, isLoading, error } = useSWR("/api/jobs/categories", fetcher);

  const categories = useMemo(() => parsingCategoriesToOptions(data, isLoading, error), [data, isLoading, error])

  const filters = useMemo
    (() => {
      return [
        {
          name: 'categories',
          label: 'Categories',
          items: categories
        }
      ] as filterFormType[]
    }, [categories])

  return {
    filters
  }
};

export default useCategoryJobFilter;
