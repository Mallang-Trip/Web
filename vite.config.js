import { loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          // svgr options
        },
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
  };
};
