import Image from 'next/image'

export type NormalizedStep = {
  name?: string | null
  description?: string | null
  media?: { url?: string | null; width?: number | null; height?: number | null } | null
}

export function typeBadgeStyle(type: string): React.CSSProperties {
  const bg = type === 'activate' ? '#2563eb' : '#0d9488'
  return {
    fontSize: '0.65rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    background: bg,
    color: '#fff',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    flexShrink: 0,
  }
}

export function StepCard({ step, index }: { step: NormalizedStep; index: number }) {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      padding: '1.25rem',
      borderRadius: '10px',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      border: '1px solid #e5e7eb',
    }}>
      <div style={{
        flexShrink: 0,
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        background: '#e0e7ff',
        color: '#3730a3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '0.875rem',
      }}>
        {index}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {step.name && (
          <p style={{ fontWeight: 600, margin: '0 0 0.3rem', fontSize: '0.95rem', color: '#111' }}>{step.name}</p>
        )}
        {step.description && (
          <p style={{ margin: 0, color: '#374151', lineHeight: 1.6, fontSize: '0.9rem' }}>{step.description}</p>
        )}
        {step.media?.url && (
          <div style={{ marginTop: '0.75rem', borderRadius: '8px', overflow: 'hidden', display: 'inline-block', maxWidth: '100%' }}>
            <Image
              src={step.media.url}
              alt={step.name ?? `Step ${index}`}
              width={step.media.width ?? 600}
              height={step.media.height ?? 400}
              style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export function StepList({ steps, label }: { steps: NormalizedStep[]; label?: string }) {
  if (!steps.length) return null
  return (
    <section style={{ marginBottom: '2rem' }}>
      {label && (
        <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', margin: '0 0 0.75rem' }}>
          {label}
        </h2>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {steps.map((step, i) => (
          <StepCard key={i} step={step} index={i + 1} />
        ))}
      </div>
    </section>
  )
}
