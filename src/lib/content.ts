import raw from "@/content/birthday.config.json";

export type BirthdayContent = typeof raw;
export const content: BirthdayContent = raw;

export const scenes = [
  "password",
  "loading",
  "envelope",
  "letter",
  "memories",
  "cake",
  "music",
  "wishes",
  "night",
  "gift",
  "final",
  "credits",
] as const;
export type Scene = (typeof scenes)[number];

export function nextScene(current: Scene): Scene | null {
  const i = scenes.indexOf(current);
  return i >= 0 && i < scenes.length - 1 ? scenes[i + 1] : null;
}
