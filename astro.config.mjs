// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-ignore - Vite plugin version compatibility
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});
