import prisma from "@/lib/prisma";

export const getCategories = async () => {
  return await prisma.categoryJob.findMany();
};

export const getIndustries = async () => {
  return await prisma.industry.findMany();
};
