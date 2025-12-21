import { authOptions } from "@/lib/auth";
import OverviewForm from "@/components/dashboard/OverviewForm";
import SocialMediaForm from "@/components/dashboard/SocialMediaForm";
import TeamForm from "@/components/dashboard/TeamForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth/next";
import React from "react";
import prisma from "@/lib/prisma";

export const revalidate = 0;

async function getDetailCompany() {
  const session = await getServerSession(authOptions) as { user?: { id: string } } | null;

  const company = await prisma.company.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: {
      CompanyOverview: true,
      CompanySocialMedia: true,
      CompanyTeam: true,
    },
  });

  return company;
}

const SettingsPage = async () => {
  const company = await getDetailCompany();

  return (
    <div>
      <div className="text-semibold text-3xl mb-5">Settings</div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overveiw">
          <OverviewForm detail={company?.CompanyOverview[0]} />
        </TabsContent>
        <TabsContent value="socialLinks">
          <SocialMediaForm detail={company?.CompanySocialMedia[0]} />
        </TabsContent>
        <TabsContent value="Teams">
          <TeamForm teams={company?.CompanyTeam} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
