/**
 * Star-tap magical transition: a warm champagne-gold light wave spreads in a
 * circle from the exact tap point, briefly covers the viewport (blush-pink
 * sparkles trailing the edge), then fades to reveal the next scene.
 * The veil lives on document.body, independent of React route lifecycles,
 * so the reveal feels continuous and cleans itself up afterwards.
 */
export function launchMagicVeil(x: number, y: number, onCovered: () => void) {
  const veil = document.createElement("div");
  veil.className = "magic-veil";
  veil.style.setProperty("--ox", `${x}px`);
  veil.style.setProperty("--oy", `${y}px`);
  for (let i = 0; i < 12; i++) {
    const s = document.createElement("span");
    s.className = "magic-spark";
    const a = (Math.PI * 2 * i) / 12 + Math.random() * 0.5;
    const d = 90 + Math.random() * 160;
    s.style.setProperty("--dx", `${Math.cos(a) * d}px`);
    s.style.setProperty("--dy", `${Math.sin(a) * d}px`);
    s.style.animationDelay = `${120 + Math.random() * 320}ms`;
    veil.appendChild(s);
  }
  document.body.appendChild(veil);
  requestAnimationFrame(() => requestAnimationFrame(() => veil.classList.add("go")));
  window.setTimeout(onCovered, 1500); // navigate while fully covered
  window.setTimeout(() => {
    veil.classList.add("fade");
    window.setTimeout(() => veil.remove(), 850);
  }, 1620);
}
