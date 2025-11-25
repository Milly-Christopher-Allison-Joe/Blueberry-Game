// This is setup to use a proxy for local testing
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  root: "./client",
  build: {
    outDir: "../dist",
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
