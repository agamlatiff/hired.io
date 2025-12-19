import Image from "next/image";
import FormSearch from "./FormSearch";

const Hero = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="w-1/2">
        <div className="text-7xl font-semibold text-slate-600 w-max">
          Discover <br />
          more than <br />
          <span className="text-primary">5000+ Jobs</span>{" "}
        </div>
        <Image
          src={"/images/pattern2.png"}
          alt="image"
          width={455}
          height={32}
          className="mb-2"
        />
        <div className="text-muted-foreground text-lg">
          Greate platform for the job seeker that searching for <br /> new
          career heights and passionate about startups.
        </div>
      </div>

      <div className="block mt-2 ">
        <Image src={'/images/hero.png'} alt="/images/hero.png" width={501} height={710} className="object-contain" />
      </div>
      <FormSearch />
    </div>
  );
};

export default Hero;
