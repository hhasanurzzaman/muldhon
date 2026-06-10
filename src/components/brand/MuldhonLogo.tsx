/**
 * Muldhon brand mark — hand + money bag icon with wordmark.
 * SVG matches the green/yellow logo from the design file.
 */

interface MuldhonLogoProps {
  className?: string;
}

export function MuldhonLogo({ className = "" }: MuldhonLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="62"
        height="48"
        viewBox="0 0 62 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M26 12h16l-4 7H29l-3-7Z" fill="#E7A820" />
        <path d="M31 4h8l-2 8h-4l-2-8Z" fill="#0AA05A" />
        <circle cx="34.5" cy="27" r="12.5" fill="#F1C33B" />
        <path d="M28 22c2.2-3.2 10.2-3.1 13 0" stroke="#138753" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M35 20v14" stroke="#138753" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M31 25h8" stroke="#138753" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M3 34c8-5 16-7 25-5 5 1 9 4 15 1l13-8c2-1 4 1 2 3L42 39c-5 4-13 5-20 2L3 34Z"
          fill="#0B7E55"
        />
        <path d="M9 39c11 6 22 7 33 2" stroke="#E7A820" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="text-[30px] font-bold leading-none tracking-tight text-[#0B7E55]">
        মূলধন
      </span>
    </div>
  );
}
