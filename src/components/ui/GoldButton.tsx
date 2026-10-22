import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const GoldButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm font-medium tracking-wide text-rose-950 transition",
        "bg-gradient-to-r from-amber-200 via-rose-100 to-amber-200 shadow-[0_10px_30px_-10px_rgba(200,150,80,0.7)]",
        "hover:shadow-[0_18px_50px_-14px_rgba(200,150,80,0.9)] active:scale-[0.98]",
        "dark:text-amber-50 dark:from-amber-300/80 dark:via-rose-200/60 dark:to-amber-300/80",
        className,
      )}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  ),
);
GoldButton.displayName = "GoldButton";
