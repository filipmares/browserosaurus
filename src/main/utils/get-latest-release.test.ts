import { isNewerVersion, parseVersion } from './get-latest-release.js'

test('parses major.minor.patch from a tag or version string', () => {
  expect(parseVersion('v20.12.6')).toStrictEqual([20, 12, 6])
  expect(parseVersion('20.12.0')).toStrictEqual([20, 12, 0])
  expect(parseVersion('not-a-version')).toBeUndefined()
})

test('detects a newer release version', () => {
  expect(isNewerVersion('v20.12.6', '20.12.0')).toBe(true)
  expect(isNewerVersion('v20.13.0', '20.12.99')).toBe(true)
  expect(isNewerVersion('v21.0.0', '20.99.99')).toBe(true)
})

test('does not flag same or older versions as newer', () => {
  expect(isNewerVersion('v20.12.0', '20.12.0')).toBe(false)
  expect(isNewerVersion('v20.12.0', '20.12.5')).toBe(false)
  expect(isNewerVersion('v20.11.9', '20.12.0')).toBe(false)
})

test('treats unparseable versions as not newer', () => {
  expect(isNewerVersion('nightly', '20.12.0')).toBe(false)
  expect(isNewerVersion('v20.12.6', 'unknown')).toBe(false)
})
