import { parseBuildNumber } from './get-latest-release.js'

test('parses the build number from a release tag', () => {
  expect(parseBuildNumber('v20.12.0-build.4')).toBe(4)
  expect(parseBuildNumber('v20.12.0-build.123')).toBe(123)
})

test('returns undefined for tags without a build number', () => {
  expect(parseBuildNumber('v20.12.0')).toBeUndefined()
  expect(parseBuildNumber('nightly')).toBeUndefined()
})
