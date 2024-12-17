import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {},
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            VITE_PASS_RESOURCE_URL: env.VITE_PASS_RESOURCE_URL,
          },
        },
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          main: "./index.html",
        },
      },
    },
    optimizeDeps: {
      exclude: ["js-big-decimal"],
    },
    define: {
      global: "globalThis",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
