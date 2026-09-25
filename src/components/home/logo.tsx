import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/logo/yspace-wordmark.png"
      alt="ySpace"
      width={2717}
      height={906}
      decoding="async"
      className={cn("block h-7 w-auto select-none", className)}
    />
  );
}
