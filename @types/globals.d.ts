declare module '*.png'
declare module '*.svg'
declare module '*.css'

// Injected at build time by vite.main.config.ts (the release workflow's
// GITHUB_RUN_NUMBER, or "0" for local/manual builds).
declare const __APP_BUILD_NUMBER__: string
