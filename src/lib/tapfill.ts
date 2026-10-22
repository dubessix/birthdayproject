import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Tap-to-fill ink: a coloured dot appears at the exact tap point and spreads
 * like ink until it fills the whole button, then softly recedes.
 * Host buttons must be `relative isolate overflow-hidden`; the ink sits at
 * z-index -1 so labels/icons always stay readable above it.
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
    const spread = ink.animate(
      [
        { transform: "translate(-50%, -50%) scale(0)", opacity: 0.95 },
        { transform: "translate(-50%, -50%) scale(1)", opacity: 0.9 },
      ],
      { duration: 560, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
    );
    spread.onfinish = () => {
      const fade = ink.animate([{ opacity: 0.9 }, { opacity: 0 }], {
        duration: 480,
        easing: "ease-out",
        fill: "forwards",
      });
      fade.onfinish = () => ink.remove();
    };
  };
}
