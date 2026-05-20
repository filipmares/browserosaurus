import { getDomain } from 'tldts'

/**
 * Returns the registrable (eTLD+1) domain for a URL, lowercased.
 * Subdomains collapse to the same value (e.g. `mail.google.com` and
 * `images.google.com` both yield `google.com`). Multi-level public
 * suffixes are handled correctly (e.g. `example.co.uk` → `example.co.uk`).
 *
 * Returns `null` for any URL whose registrable domain cannot be determined
 * (raw IPs, `file://` URLs, malformed strings, etc.). Callers should fall
 * back to the manual picker in that case.
 */
export function extractDomain(url: string): string | null {
  if (!url) return null
  const domain = getDomain(url)
  return domain ? domain.toLowerCase() : null
}
