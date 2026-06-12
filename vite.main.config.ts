import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      entry: ['src/main/main.ts'],
      formats: ['es'],
    },
    rollupOptions: {
      external: ['file-icon'],
    },
  },
  // The release workflow tags builds as `v{version}-build.{GITHUB_RUN_NUMBER}`.
  // Inject that run number so the running app can compare itself against the
  // latest GitHub release. Defaults to "0" for local/manual builds.
  define: {
    __APP_BUILD_NUMBER__: JSON.stringify(process.env.GITHUB_RUN_NUMBER ?? '0'),
  },
  publicDir: path.join(__dirname, 'src', 'shared', 'static'),
  resolve: {
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
})
