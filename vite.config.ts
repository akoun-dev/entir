import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Désactivé temporairement en raison de problèmes de compatibilité ESM/CommonJS
// import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    react(),
    // Désactivé temporairement en raison de problèmes de compatibilité ESM/CommonJS
    // mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
