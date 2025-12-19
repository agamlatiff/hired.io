import BannerSignUp from "@/components/page/BannerSignUp";
import Category from "@/components/page/Category";
import Clients from "@/components/page/Clients";
import FeaturedJobs from "@/components/page/FeaturedJobs";
import Hero from "@/components/page/Hero";
import LatestJobs from "@/components/page/LatestJobs";
import Image from "next/image";

const LandingPage = () => {
  return (
    <>
      <div className="absolute w-2/3 h-screen top-0 right-0 -z-10">
        <Image src={"/images/pattern.png"} alt="/images/pattern.png" fill className="object-cover" />
      </div>
      <div className="px-32 mb-0">
        <Hero />
        <Clients />
        <Category />
        <BannerSignUp />
        <FeaturedJobs />
        <LatestJobs />
      </div>
    </>
  );
};

export default LandingPage;
