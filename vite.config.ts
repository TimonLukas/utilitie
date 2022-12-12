import { fileURLToPath, URL } from "node:url"

import type { InputPluginOption } from "rollup"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import UnpluginAutoImport from "unplugin-auto-import/vite"
import UnpluginVueComponents from "unplugin-vue-components/vite"
import UnpluginIcons from "unplugin-icons/vite"
import { viteSingleFile } from "vite-plugin-singlefile"

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill"
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill"
import rollupNodePolyFill from "rollup-plugin-node-polyfills"

import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import IconsResolver from "unplugin-icons/resolver"

Error.stackTraceLimit = Infinity

export default defineConfig({
  plugins: [
    vue(),
    UnpluginAutoImport({
      resolvers: [ElementPlusResolver()],
      dts: true,
    }),
    UnpluginVueComponents({
      resolvers: [ElementPlusResolver(), IconsResolver()],
      dts: true,
    }),
    UnpluginIcons({ compiler: "vue3" }),
    viteSingleFile(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
      process: "rollup-plugin-node-polyfills/polyfills/process-es6",
      path: "rollup-plugin-node-polyfills/polyfills/path",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill() as InputPluginOption],
    },
  },
})
