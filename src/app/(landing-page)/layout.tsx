import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";
import AuthProvider from "./providers/AuthProvider";

export const metadata = {
  title: "JobHuntly - Find Your Dream Job",
  description: "Find your next career at companies like HubSpot, Nike, and Dropbox",
};

export default async function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="relative overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
