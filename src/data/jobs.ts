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
      _count: {
        select: { Applicant: true },
      },
    },
  });
};

export const getSimilarJobs = async (
  currentJobId: string,
  companyId: string,
  limit: number = 3
) => {
  return await prisma.job.findMany({
    where: {
      id: { not: currentJobId },
      OR: [
        { companyId: companyId },
      ],
    },
    include: {
      Company: true,
    },
    take: limit,
    orderBy: {
      datePosted: "desc",
    },
  });
};

// Get job counts by tech stack for trending section
export const getTechStackCounts = async () => {
  const jobs = await prisma.job.findMany({
    select: {
      requiredSkills: true,
    },
  });

  // Count occurrences of each skill
  const skillCounts: Record<string, number> = {};

  jobs.forEach((job) => {
    job.requiredSkills.forEach((skill) => {
      // Normalize skill name (trim whitespace)
      const normalizedSkill = skill.trim();
      if (normalizedSkill) {
        skillCounts[normalizedSkill] = (skillCounts[normalizedSkill] || 0) + 1;
      }
    });
  });

  // Convert to array and sort by count
  return Object.entries(skillCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

