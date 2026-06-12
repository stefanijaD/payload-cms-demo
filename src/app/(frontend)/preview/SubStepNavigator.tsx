'use client'

import { useState } from 'react'
import { StepList, type NormalizedStep } from './StepComponents'
import { DetailedToggle } from './DetailedToggle'

export type NormalizedSubStep = {
  key: string
  base: NormalizedStep[]
  detailed: NormalizedStep[]
}

function formatKey(key: string) {
  return key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
}

export function SubStepNavigator({ subSteps }: { subSteps: NormalizedSubStep[] }) {
  const [index, setIndex] = useState(0)

  if (!subSteps.length) return null

  const subStep = subSteps[index]
  const isFirst = index === 0
  const isLast = index === subSteps.length - 1

  function goTo(next: number) {
    setIndex(next)
  }

  const navBtn = (disabled: boolean): React.CSSProperties => ({
    padding: '0.4rem 0.9rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    background: disabled ? '#f9fafb' : '#fff',
    color: disabled ? '#d1d5db' : '#374151',
    cursor: disabled ? 'default' : 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
  })

  return (
    <div>
      {/* step nav bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        padding: '0.75rem 1rem',
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}>
        <button disabled={isFirst} onClick={() => goTo(index - 1)} style={navBtn(isFirst)}>
          ← Previous
        </button>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#111', textTransform: 'capitalize' }}>
            {formatKey(subStep.key)}
          </p>
          <p style={{ margin: 0, fontSize: '0.72rem', color: '#9ca3af', marginTop: '0.1rem' }}>
            {index + 1} of {subSteps.length}
          </p>
        </div>
        <button disabled={isLast} onClick={() => goTo(index + 1)} style={navBtn(isLast)}>
          Next →
        </button>
      </div>

      <StepList steps={subStep.base} />
      <DetailedToggle steps={subStep.detailed} />
    </div>
  )
}
