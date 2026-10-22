import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TypeWriter({
  text,
  speed = 42,
  delay = 0,
  className,
  onDone,
  caret = true,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onDone?: () => void;
  caret?: boolean;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    let mounted = true;
    let id: ReturnType<typeof setTimeout>;
    const start = setTimeout(function step() {
      if (!mounted) return;
      setI((v) => {
        if (v >= text.length) { onDone?.(); return v; }
        id = setTimeout(step, speed);
        return v + 1;
      });
    }, delay);
    return () => { mounted = false; clearTimeout(start); clearTimeout(id!); };
  }, [text, speed, delay, onDone]);
  return (
    <span className={cn(className)}>
      {text.slice(0, i)}
      {caret && i < text.length && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-current" />}
    </span>
  );
}
