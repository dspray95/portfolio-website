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
    optimizeDeps: {
      // Exclude your WASM glue code module from Vite's dependency pre-bundling.
      // This should make Vite serve it as raw ESM without Esbuild transformation.
      exclude: ["../wasm-canyon-game/wasm_game_engine", "@syntect/wasm"], // Or the full path
      // if using aliases, ensure it matches the final resolved path.
      // Use the actual import path your WasmRunner uses.
      // Example: if `import ... from "../wasm-canyon-game/wasm_game_engine";`
      // then the string should be exactly "../wasm-canyon-game/wasm_game_engine"
    },
    build: {
      target: "esnext", // Or 'es2022'
      rollupOptions: {
        external: ["../wasm-canyon-game/wasm_game_engine"], // Tell Rollup not to bundle it
      },
    },
  };
});
