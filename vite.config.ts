import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Eatgorithm",
        short_name: "Eatgorithm",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#3f51b5",
        icons: [
          {
            src: "public/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "public/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
