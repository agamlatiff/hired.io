import prisma from "@/lib/prisma";

export const getJobs = async () => {
  return await prisma.job.findMany({
    include: {
      Company: {
        include: {
          CompanyOverview: true,
        },
      },
      CategoryJob: true,
    },
    orderBy: {
      datePosted: "desc",
    },
  });
};

export const getJobById = async (jobId: string) => {
  return await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      Company: {
        include: {
          CompanyOverview: true,
          CompanySocialMedia: true,
        },
      },
      CategoryJob: true,
    },
  });
};
