import { ConfigEnv, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import styleImport from "vite-plugin-style-import";
import { resolve } from "path";
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  // import.meta.env.VITE_BASE_URL -> process.env.VITE_BASE_URL
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      styleImport({
        libs: [
          {
            libraryName: "element-plus",
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: name => {
              return `element-plus/lib/theme-chalk/${name}.css`;
            },
            resolveComponent: name => {
              return `element-plus/lib/${name}`;
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
        {
          find: "comps",
          replacement: resolve(__dirname, "src/components"),
        },
        {
          find: "utils",
          replacement: resolve(__dirname, "src/utils"),
        },
      ],
    },
    server: {
      cors: true,
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "/api"),
        },
      },
    },
    optimizeDeps: {
      include: ["axios", "lodash-es", "js-cookie", "element-plus"],
    },
  });
};
