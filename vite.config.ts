import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: false,             // skip auto-open browser
  },
  build: {
    target: "esnext",
    sourcemap: false,        // 🟢 turn off heavy sourcemaps in dev
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
      "axios",
      "sonner",
    ],
    exclude: ["@/assets"],   // skip scanning static assets
  },
  css: {
    devSourcemap: false,     // 🟢 disable CSS sourcemaps
  },
})
