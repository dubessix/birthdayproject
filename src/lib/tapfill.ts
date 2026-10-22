import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Hold-to-fill ink: pressing a button grows a colour pool from the exact tap
 * point — slowly, like ink soaking paper — until it fills the whole button
 * (never beyond: the host clips it). While the finger stays down the fill
 * holds; on release it fades away slowly. Quick taps still get the full
 * soak-then-fade cycle, so every press is clearly visible.
 * Host buttons must be `relative isolate overflow-hidden`; ink sits at
 * z-index -1 so labels/icons stay readable above it.
 */
export function tapFill(color = "rgba(255,255,255,0.4)") {
  return (e: ReactPointerEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));
    const ink = document.createElement("span");
    ink.setAttribute("aria-hidden", "true");
    ink.className = "tapfill-ink";
    ink.style.left = `${x}px`;
    ink.style.top = `${y}px`;
    ink.style.width = `${radius * 2}px`;
    ink.style.height = `${radius * 2}px`;
    ink.style.background = color;
    btn.appendChild(ink);

    let released = false;
    const fadeOut = () => {
      const fade = ink.animate([{ opacity: 0.9 }, { opacity: 0 }], {
        duration: 900,
        easing: "ease-out",
        fill: "forwards",
      });
      fade.onfinish = () => ink.remove();
    };
    const release = () => {
      released = true;
      if (spread.playState === "finished") fadeOut();
    };
    btn.addEventListener("pointerup", release, { once: true });
    btn.addEventListener("pointercancel", release, { once: true });

    const spread = ink.animate(
      [
        { transform: "translate(-50%, -50%) scale(0)", opacity: 0.95 },
        { transform: "translate(-50%, -50%) scale(1)", opacity: 0.9 },
      ],
      { duration: 1200, easing: "ease-in-out", fill: "forwards" },
    );
    spread.onfinish = () => {
      if (released) fadeOut();
    };
  };
}
