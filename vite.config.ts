// vite.config.ts
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // File-file statis yang akan di-copy ke folder build
      includeAssets: [
        "favicon.ico",
        "AppIcon@3x.png", // iOS icon (180x180)
        "icons/icon-192x192.png", // Android/Chrome
        "icons/icon-512x512.png", // Android/Chrome
      ],
      manifest: {
        name: "Eatgorithm",
        short_name: "Eatgorithm",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#3f51b5",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
