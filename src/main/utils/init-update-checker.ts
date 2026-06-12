import { app } from 'electron'

import { logger } from '../../shared/utils/logger.js'
import { availableUpdate } from '../state/actions.js'
import { dispatch } from '../state/store.js'
import { getLatestRelease, isNewerVersion } from './get-latest-release.js'

async function checkForUpdate(): Promise<void> {
  const release = await getLatestRelease()

  if (!release) {
    return
  }

  if (isNewerVersion(release.tag, app.getVersion())) {
    logger('AutoUpdater', `Update available: ${release.tag}`)
    dispatch(availableUpdate(release.downloadUrl))
  }
}

/**
 * Auto update check on production.
 *
 * This fork's builds are unsigned, so Squirrel.Mac cannot apply updates
 * in-app. Instead, poll the fork's GitHub releases and, when a newer build is
 * found, surface a button that opens the release asset in the browser to
 * download.
 */
export async function initUpdateChecker(): Promise<void> {
  if (!app.isPackaged) {
    return
  }

  await checkForUpdate()

  // 1000 * 60 * 60 * 24
  const ONE_DAY_MS = 86_400_000

  // Check for updates every day.
  setInterval(async () => {
    await checkForUpdate()
  }, ONE_DAY_MS)
}
