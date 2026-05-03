import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

type BrandWordmarkProps = {
  className?: string;
  prefixClassName?: string;
  accentClassName?: string;
};

export function BrandWordmark({
  className,
  prefixClassName,
  accentClassName,
}: BrandWordmarkProps) {
  return (
    <span className={cn("font-bold", className)}>
      <span className={prefixClassName}>{brand.wordmarkPrefix}</span>
      <span className={cn("text-brand-orange", accentClassName)}>{brand.wordmarkAccent}</span>
    </span>
  );
}
