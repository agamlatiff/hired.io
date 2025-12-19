import Image from "next/image";

export const metadata = {
  title: "Authentication - JobHuntly",
  description: "Sign in or sign up to JobHuntly",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="relative h-screen">
        <div className="absolute w-full h-full">
          <Image alt="background auth" src={'/images/bg-auth.png'} fill className="object-cover object-top" />
        </div>
      </div>
      <div className="w-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}
