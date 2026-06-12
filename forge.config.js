// @ts-check

import { MakerZIP } from '@electron-forge/maker-zip'
import { VitePlugin } from '@electron-forge/plugin-vite'

/** @type {import('@electron-forge/shared-types').ForgeConfig} */
const config = {
  makers: [new MakerZIP({}, ['darwin'])],
  packagerConfig: {
    appBundleId: 'com.browserosaurus',
    appCategoryType: 'public.app-category.developer-tools',
    asar: false,
    extendInfo: 'plist/Info.plist',
    icon: 'src/shared/static/icon/icon.icns',
    osxNotarize: process.env.CI
      ? undefined
      : {
          keychain: '~/Library/Keychains/login.keychain-db',
          keychainProfile: 'AC_PASSWORD',
        },
    osxSign: process.env.CI
      ? undefined
      : {
          optionsForFile: () => ({
            entitlements: 'plist/entitlements.mac.plist',
            'hardened-runtime': true,
          }),
        },
    protocols: [
      {
        name: 'HTTP link',
        schemes: ['http', 'https'],
      },
      {
        name: 'File',
        schemes: ['file'],
      },
    ],
  },
  plugins: [
    new VitePlugin({
      build: [
        {
          config: 'vite.main.config.ts',
          entry: 'src/main/main.ts',
        },
        {
          config: 'vite.preload.config.ts',
          entry: 'src/renderers/shared/preload.ts',
        },
      ],
      renderer: [
        {
          config: 'vite.renderer.prefs.config.ts',
          name: 'prefs_window',
        },
        {
          config: 'vite.renderer.picker.config.ts',
          name: 'picker_window',
        },
      ],
    }),
  ],
  hooks: {
    // In CI there is no Apple Developer certificate, so osxSign/osxNotarize
    // above are disabled. Without re-signing, the packaged bundle keeps
    // Electron's original ad-hoc signature, which macOS treats as broken once
    // Forge renames the bundle and swaps in our Info.plist/icon. Downloaded
    // builds then fail to launch as "damaged". Apply a fresh ad-hoc signature
    // so the app runs once quarantine is cleared (still unsigned/un-notarized).
    postPackage: async (_config, { platform, outputPaths }) => {
      if (!process.env.CI || platform !== 'darwin') return
      const { execFileSync } = await import('node:child_process')
      const { readdirSync } = await import('node:fs')
      const { join } = await import('node:path')
      for (const outputPath of outputPaths) {
        const appName = readdirSync(outputPath).find((entry) =>
          entry.endsWith('.app'),
        )
        if (!appName) continue
        const appPath = join(outputPath, appName)
        execFileSync('codesign', ['--force', '--deep', '--sign', '-', appPath], {
          stdio: 'inherit',
        })
        execFileSync('codesign', ['--verify', '--deep', '--strict', appPath], {
          stdio: 'inherit',
        })
      }
    },
  },
}

export default config
