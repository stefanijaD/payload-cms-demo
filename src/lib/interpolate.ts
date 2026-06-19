const PARTNER_NAME_RE = /\{\{partnerName\}\}/g

/**
 * Replaces {{partnerName}} in a localized string.
 * When partnerName is empty the placeholder is left unchanged.
 */
export function interpolateText(
  text: string | null | undefined,
  partnerName: string,
): string | null | undefined {
  if (text == null) return text
  if (!partnerName) return text
  return text.replace(PARTNER_NAME_RE, partnerName)
}
