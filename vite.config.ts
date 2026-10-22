import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Plain Vite config (Lovable wrapper removed). Plugin set mirrors what the
// wrapper provided: TanStack Start (SSR + nitro, server entry src/server.ts),
// React, Tailwind v4, tsconfig paths (@/* alias). Devtools omitted (dev-only).
export default defineConfig({
  server: { allowedHosts: true },
  resolve: { dedupe: ["react", "react-dom"] },
  plugins: [
    tanstackStart({ server: { entry: "server" } }),
    nitro(),
    viteReact(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
