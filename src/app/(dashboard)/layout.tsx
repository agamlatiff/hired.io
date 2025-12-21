import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import NextAuthProvider from "@/context/NextAuthProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard - JobHuntly",
  description: "Manage your job postings and company profile",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session === null) {
    return redirect("/auth/signin");
  }

  return (
    <NextAuthProvider>
      <main>
        <div className="border-t">
          <div className="bg-background">
            <div className="flex flex-row">
              <div className="hidden lg:block w-[18%]">
                <Sidebar />
              </div>
              <div className="col-span-3 overflow-auto lg:col-span-5 lg:border-l w-[82%]">
                <div className="px-6 py-6 lg:px-8">
                  <div>
                    <Header />
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </NextAuthProvider>
  );
}