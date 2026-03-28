import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const ghPagesBase = repoName ? `/${repoName}/` : "/madalenos-paws-pro/";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Usa subpasta apenas em produção (ex.: GitHub Pages) e raiz no desenvolvimento local.
  base: mode === "production" ? ghPagesBase : "/",

  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
