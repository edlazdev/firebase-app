import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // GitHub Pages serves from /firebase-app/; Firebase Hosting and dev serve from root.
  // `vite build --mode firebase` (see build:firebase script) targets Firebase Hosting.
  const base = command === "build" && mode !== "firebase" ? "/firebase-app/" : "/"

  return {
    plugins: [vue()],
    base,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@/stores": path.resolve(__dirname, "src/stores"),
      },
    },
  }
})
