import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const GlassCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative rounded-3xl border border-white/40 bg-white/60 p-6 shadow-[0_20px_60px_-20px_rgba(200,140,150,0.35)]",
        "backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
        className,
      )}
      {...rest}
    />
  ),
);
GlassCard.displayName = "GlassCard";
