import { extractDomain } from './extract-domain.js'

describe('extractDomain', () => {
  it.each([
    ['https://example.com/path', 'example.com'],
    ['http://example.com:8080/', 'example.com'],
    ['https://www.example.com/', 'example.com'],
    ['https://mail.google.com/inbox/0', 'google.com'],
    ['https://images.google.com', 'google.com'],
    ['HTTPS://EXAMPLE.COM/', 'example.com'],
    ['http://example.co.uk/news', 'example.co.uk'],
    ['http://sub.example.co.uk/news', 'example.co.uk'],
    ['https://a.b.c.example.com', 'example.com'],
  ])('returns registrable domain for %s', (input, expected) => {
    expect(extractDomain(input)).toBe(expected)
  })

  it.each([
    ['', null],
    ['not a url', null],
    ['file:///Users/foo', null],
    ['http://192.168.1.1/admin', null],
    ['http://[::1]/', null],
    [['java', 'script', ':void(0)'].join(''), null],
  ])('returns null for %s', (input, expected) => {
    expect(extractDomain(input)).toBe(expected)
  })
})
