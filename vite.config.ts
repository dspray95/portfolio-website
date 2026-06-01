import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig(() => {
  return {
    plugins: [react(), wasm(), topLevelAwait()],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        "~": resolve(__dirname, "src"),
        app: resolve(__dirname, "src", "app"),
        components: resolve(__dirname, "src", "components"),
        hooks: resolve(__dirname, "src", "hooks"),
      },
    },
    build: {
      target: "esnext",
    },
  };
});
