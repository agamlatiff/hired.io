import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";

const aboutLinks = [
  "Companies",
  "Pricing",
  "Terms",
  "Advice",
  "Privacy Policy",
];
const resourceLinks = ["Help Docs", "Updates", "Contact Us"];
const socialMediaImg = [
  "/images/soc-Facebook.png",
  "/images/soc-Instagram.png",
  "/images/soc-Twitter.png",
  "/images/soc-LinkedIn.png",
  "/images/soc-Dribble.png",
];

const Footer = () => {
  return (
    <div className="bg-slate-900  px-32 text-foreground pt-16 pb-11">
      <div className="flex flex-row items-tart justify-between">
        <div>
          <Image src={"/images/logo.png"} alt="logo" width={160} height={36} />
          <div className="text-muted mt-8">
            Great PLatform for the job seeker that <br /> passionate a bout
            startups. Find your dream job <br /> easier.
          </div>
        </div>

        <div>
          <div className="text-lg text-primary-foreground font-semibold mb-5">
            About
          </div>
          <div className="space-y-4">
            {aboutLinks.map((item: string, i: number) => (
              <Link className="block text-muted" key={i} href={"/"}>
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="text-lg text-primary-foreground font-semibold mb-5">
            Resources
          </div>
          <div className="space-y-4">
            {resourceLinks.map((item: string, i: number) => (
              <Link className="block text-muted" key={i} href={"/"}>
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="text-lg text-primary-foreground font-semibold mb-5">
            Get job notifications
          </div>
          <div className="text-muted">The Latest job news, articles, sent to <br /> your inbox weekly</div>
        </div>
        <div className="mt-10 inline-flex items-center gap-3">
          <Input placeholder="Email Address" className="py-5" />
          <Button className="py-5">Subscribe</Button>
        </div>

      </div>
      <Separator className="mt-20 mb-11 bg-gray-300" />

      <div className="flex flex-row items-center justify-between">
        <div className="text-slate-600">
          2021 @JobHuntly. All right reserved.
        </div>
        <div className="space-x-3">
          {socialMediaImg.map((item: string, i: number) => (
            <Image className="inline" src={item} alt={item} key={i} width={32} height={32} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
