"use client";

import ExploreDataContainer from "@/app/containers/ExploreDataContainer";
import useCategoryCompanyFilter from "@/hooks/useCategoryCompanyFilter";
import useCompanies from "@/hooks/useCompanies";
import { formFilterCompanySchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

const FindCompaniesPage = () => {
  const formFilter = useForm<z.infer<typeof formFilterCompanySchema>>({
    resolver: zodResolver(formFilterCompanySchema),
    defaultValues: {
      industry: [],
    },
  });

  const [categories, setCategories] = useState<string[]>([]);

  const { filters } = useCategoryCompanyFilter();

  const { companies, isLoading, mutate } = useCompanies(categories);

  const onSubmit = async (val: z.infer<typeof formFilterCompanySchema>) => {
    setCategories(val.industry);
  };

  useEffect(() => {
    mutate();
  }, [categories, mutate]);

  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={onSubmit}
      filterForms={filters}
      title="dream companies"
      loading={isLoading}
      subtitle="Find the dreams companies you dream work for"
      type="company"
      data={companies}
    />
  );
};

export default FindCompaniesPage;
