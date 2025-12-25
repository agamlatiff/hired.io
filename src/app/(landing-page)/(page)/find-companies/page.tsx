import FindCompaniesClient, { UICompany } from "@/components/page/find-companies/FindCompaniesClient";
import { getCompanies } from "@/data";

export default async function FindCompaniesPage() {
  const companies = await getCompanies();

  // Map DB companies to UI companies
  const uiCompanies: UICompany[] = companies.map((comp) => {
    const overview = comp.CompanyOverview?.[0];
    return {
      id: comp.id,
      name: comp.name,
      industry: overview?.industry || "Tech",
      location: overview?.location || "Remote",
      openRoles: comp._count?.Job || 0,
      techStack: overview?.techStack || [],
      logo: comp.logo || overview?.image || null,
      description: overview?.description || "No description available",
    };
  });

  return <FindCompaniesClient initialCompanies={uiCompanies} />;
}
