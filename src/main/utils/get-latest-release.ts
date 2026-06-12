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
  buildNumber: number | undefined
  downloadUrl: string
}

/**
 * Release tags are formatted as `v{version}-build.{run_number}` by the release
 * workflow. The run number is globally monotonic, so it is used to determine
 * whether one build is newer than another.
 */
export function parseBuildNumber(tag: string): number | undefined {
  const match = /-build\.(\d+)/u.exec(tag)
  return match ? Number(match[1]) : undefined
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
      buildNumber: parseBuildNumber(data.tag_name),
      downloadUrl: pickDownloadUrl(data),
      tag: data.tag_name,
    }
  } catch {
    return undefined
  }
}
