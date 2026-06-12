import Link from 'next/link'

export function PreviewNavLink() {
  return (
    <div style={{ paddingTop: '8px', marginTop: '8px', borderTop: '1px solid var(--theme-border-color)', width: '100%' }}>
      <Link href="/preview" className="nav__link" prefetch={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginRight: '8px' }}
        >
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Preview
      </Link>
    </div>
  )
}
