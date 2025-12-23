import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Hired.io - High-Tech Job Portal",
  description:
    "Join the exclusive network where top tech companies compete to hire you. Transparent salaries, direct access to founders, and zero spam.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.className} font-display`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
