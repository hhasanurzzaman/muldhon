/**
 * Circular avatar with initials fallback (no external image required).
 */

interface UserAvatarProps {
  name: string;
  size?: "sm" | "md";
  className?: string;
}

const sizeClasses = {
  sm: "h-9 w-9 text-[11px]",
  md: "h-10 w-10 text-xs",
};

export function UserAvatar({ name, size = "md", className = "" }: UserAvatarProps) {
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-[var(--muldhon-border)] bg-stone-200 ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: `hsl(${hue} 35% 82%)` }}
      aria-hidden
    >
      <span className="absolute inset-x-[26%] top-[15%] h-[32%] rounded-full bg-[#4b2f24]" />
      <span className="absolute inset-x-[30%] top-[28%] h-[26%] rounded-full bg-[#b77754]" />
      <span className="absolute inset-x-[18%] bottom-[-18%] h-[48%] rounded-t-full bg-[#1f6b4d]" />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,rgba(255,255,255,0.45),transparent_26%)]" />
    </div>
  );
}
