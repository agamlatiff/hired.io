import Image from "next/image";
import { CLIENT_LOGOS } from "@/constants";

const Clients = () => {
  return (
    <div className="relative z-110">
      <div className="text-lg text-muted-foreground">
        Companies we helped grow
      </div>

      <div className="mt-8 flex flex-row justify-between">
        {CLIENT_LOGOS.map((item: string, i: number) => (
          <Image key={i} src={item} alt={`Client ${i + 1}`} width={139} height={35} />
        ))}
      </div>
    </div>
  );
};

export default Clients;
