'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const LOCALES = [
  { code: 'cs', label: 'Czech' },
  { code: 'da', label: 'Danish' },
  { code: 'de', label: 'German' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'hu', label: 'Hungarian' },
  { code: 'it', label: 'Italian' },
  { code: 'ko', label: 'Korean' },
  { code: 'nl', label: 'Dutch' },
  { code: 'no', label: 'Norwegian' },
  { code: 'pl', label: 'Polish' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'sk', label: 'Slovak' },
  { code: 'sv', label: 'Swedish' },
  { code: 'zh', label: 'Chinese' },
]

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('locale', e.target.value)
    router.push(`/preview?${params.toString()}`)
  }

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      style={{
        fontSize: '0.8rem',
        padding: '0.25rem 0.5rem',
        borderRadius: '6px',
        border: '1px solid #ddd',
        background: '#fafafa',
        cursor: 'pointer',
        color: '#333',
      }}
    >
      {LOCALES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label} ({l.code})
        </option>
      ))}
    </select>
  )
}
