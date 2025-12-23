import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import NextAuthProvider from "@/context/NextAuthProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard - hired.io",
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
      <div className="flex min-h-screen bg-background-dark">
        {/* Fixed Sidebar */}
        <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">
          <DashboardSidebar />
        </div>

        {/* Main Content with left margin for sidebar */}
        <main className="flex-1 lg:ml-64">
          {/* Background effects */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden lg:left-64">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[120px]" />
          </div>

          {/* Page content */}
          <div className="relative z-10 p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </NextAuthProvider>
  );
}