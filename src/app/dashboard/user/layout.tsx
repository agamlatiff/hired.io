import UserSidebar from "@/components/dashboard/UserSidebar";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background-dark font-display text-white overflow-hidden h-screen flex">
      <UserSidebar />
      <main className="flex-1 overflow-y-auto bg-background-dark relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] bg-grid pointer-events-none h-full" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 p-6 md:p-10 max-w-[1920px] mx-auto">
          {children}
        </div>
        <footer className="mt-12 text-center text-xs text-gray-600 pb-6">
          <p>© 2024 hired.io Inc. Job Seeker Dashboard</p>
        </footer>
      </main>
    </div>
  );
}
