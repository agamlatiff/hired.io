import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobHuntly - Find Your Dream Job",
  description:
    "Find your next career opportunity at top companies. Browse jobs, explore companies, and land your dream role.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
