import Image from "next/image";

interface MuldhonLogoProps {
  className?: string;
}

export function MuldhonLogo({ className = "" }: MuldhonLogoProps) {
  return (
    <Image
      src="/muldhon-logo.png"
      alt="Muldhon"
      width={300}
      height={90}
      priority
      className={`h-auto w-[150px] object-contain ${className}`}
    />
  );
}
