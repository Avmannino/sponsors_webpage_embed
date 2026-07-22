import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],

  // Local development uses "/".
  // Production is configured for a GitHub repository named:
  // sponsors_webpage_embed
  base: command === "build" ? "/sponsors_webpage_embed/" : "/",
}));