import axios from 'axios'

import package_ from '../../../package.json'
import { GITHUB_REPO } from '../../config/constants.js'

type ReleaseAsset = {
  name: string
  browser_download_url: string
}

type Release = {
  tag_name: string
  html_url: string
  assets: ReleaseAsset[]
}

export type LatestRelease = {
  tag: string
  downloadUrl: string
}

/**
 * Extracts a `[major, minor, patch]` tuple from a version string or a
 * `v`-prefixed release tag, ignoring anything around it.
 */
export function parseVersion(
  value: string,
): [number, number, number] | undefined {
  const match = /(\d+)\.(\d+)\.(\d+)/u.exec(value)
  return match
    ? [Number(match[1]), Number(match[2]), Number(match[3])]
    : undefined
}

/**
 * Returns true when `latest` is a newer semantic version than `current`.
 */
export function isNewerVersion(latest: string, current: string): boolean {
  const latestParts = parseVersion(latest)
  const currentParts = parseVersion(current)

  if (!latestParts || !currentParts) {
    return false
  }

  const [latestMajor, latestMinor, latestPatch] = latestParts
  const [currentMajor, currentMinor, currentPatch] = currentParts

  if (latestMajor !== currentMajor) {
    return latestMajor > currentMajor
  }

  if (latestMinor !== currentMinor) {
    return latestMinor > currentMinor
  }

  return latestPatch > currentPatch
}

/**
 * Picks the download URL for the asset matching the running architecture,
 * falling back to the release page when no matching asset is found.
 */
function pickDownloadUrl(release: Release): string {
  const asset = release.assets.find(
    (item) =>
      item.name.includes('darwin') && item.name.includes(process.arch),
  )

  return asset?.browser_download_url ?? release.html_url
}

/**
 * Fetches the latest published release of this fork from the GitHub API.
 */
export async function getLatestRelease(): Promise<LatestRelease | undefined> {
  try {
    const { data } = await axios.get<Release>(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': `${package_.name}/${package_.version}`,
        },
      },
    )

    return {
      downloadUrl: pickDownloadUrl(data),
      tag: data.tag_name,
    }
  } catch {
    return undefined
  }
}
