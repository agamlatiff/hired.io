"use client";

import ExploreDataContainer from "@/app/containers/ExploreDataContainer";
import useCategoryJobFilter from "@/hooks/useCategoryJobFilter";
import useJobs from "@/hooks/useJobs";
import { formFilterSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

const FindJobsPage = () => {
  const { filters } = useCategoryJobFilter();

  const formFilter = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: [],
    },
  });
  const [categories, setCategories] = useState<string[]>([]);

  const { jobs, isLoading, mutate } = useJobs(categories);

  const onSubmitFormFilter = async (val: z.infer<typeof formFilterSchema>) => {
    setCategories(val.categories);
  };

  useEffect(() => {
    mutate();
  }, [categories, mutate]);

  return (
    <ExploreDataContainer
      type="job"
      data={jobs}
      title="dream job"
      subtitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
      loading={isLoading}
      filterForms={filters}
      formFilter={formFilter}
      onSubmitFilter={onSubmitFormFilter}
    />
  );
};

export default FindJobsPage;
