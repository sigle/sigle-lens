import { cn } from "@/lib/cn";
import { Text } from "@radix-ui/themes";
import Image from "next/image";

export const CarouselItem = ({
  description,
  image,
  active,
}: {
  description: React.ReactNode;
  image: string;
  active: boolean;
}) => {
  return (
    <div
      className={cn("space-y-4", {
        block: active === true,
        hidden: active === false,
      })}
    >
      <Text color="gray">{description}</Text>
      <div className="relative z-0 mx-auto max-w-[600px] overflow-hidden rounded-2 shadow-1">
        <Image
          width={600}
          height={350}
          src={image}
          alt="hint"
          layout="responsive"
          objectFit="cover"
        />
      </div>
    </div>
  );
};
