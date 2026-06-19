import { describe, it, expect } from 'vitest'
import { interpolateText } from '@/lib/interpolate'

describe('interpolateText', () => {
  it('replaces {{partnerName}} with the provided value', () => {
    expect(interpolateText('Hello {{partnerName}}!', 'NRV')).toBe('Hello NRV!')
  })

  it('replaces all occurrences in the same string', () => {
    expect(interpolateText('{{partnerName}} — powered by {{partnerName}}', 'NRV')).toBe(
      'NRV — powered by NRV',
    )
  })

  it('preserves placeholder when partnerName is empty string', () => {
    expect(interpolateText('Hello {{partnerName}}!', '')).toBe('Hello {{partnerName}}!')
  })

  it('returns null unchanged regardless of partnerName', () => {
    expect(interpolateText(null, 'NRV')).toBeNull()
  })

  it('returns undefined unchanged regardless of partnerName', () => {
    expect(interpolateText(undefined, 'NRV')).toBeUndefined()
  })

  it('returns text unchanged when it contains no placeholder', () => {
    expect(interpolateText('No placeholder here', 'NRV')).toBe('No placeholder here')
  })

  it('does not replace arbitrary template patterns — only {{partnerName}}', () => {
    expect(interpolateText('Hello {{name}} and {{partnerName}}', 'NRV')).toBe(
      'Hello {{name}} and NRV',
    )
  })
})
