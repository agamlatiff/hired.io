import prisma from "@/lib/prisma";

export const getCompanies = async () => {
  return await prisma.company.findMany({
    include: {
      _count: {
        select: { Job: true },
      },
      CompanyOverview: true,
    },
  });
};

export const getCompanyById = async (companyId: string) => {
  return await prisma.company.findUnique({
    where: {
      id: companyId,
    },
    include: {
      CompanySocialMedia: true,
      CompanyTeam: true,
      CompanyOverview: true,
      Job: true,
      _count: {
        select: { Job: true },
      },
    },
  });
};
