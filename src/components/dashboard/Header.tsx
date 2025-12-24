"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const navCreateJobPage = () => router.push("/dashboard/post-job");
  return (
    <div className="pb-3 mb-8 border-b border-border flex flex-row items-center justify-between">
      <div>
        <div>Company</div>
        <div className="font-semibold">{session?.user.name}</div>
      </div>
      <div>
        <Button className="rounded-none py-3 px-6" onClick={navCreateJobPage}>
          <PlusIcon className="mr-2 w-4 h-4" />
          Post a job
        </Button>
      </div>
    </div>
  );
};

export default Header;
