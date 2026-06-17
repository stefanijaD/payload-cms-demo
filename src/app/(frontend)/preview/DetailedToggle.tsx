'use client'

import { useState } from 'react'
import { StepList, type NormalizedStep } from './StepComponents'

export function DetailedToggle({ steps }: { steps: NormalizedStep[] }) {
  const [open, setOpen] = useState(false)

  if (!steps.length) return null

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          width: '100%',
          padding: '0.65rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#4b5563',
          textAlign: 'left',
        }}
      >
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.15s',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          fontSize: '0.7rem',
        }}>▶</span>
        {open ? 'Hide detailed steps' : 'Show detailed steps'}
      </button>
      {open && (
        <div style={{ marginTop: '0.75rem' }}>
          <StepList steps={steps} label="Detailed steps" />
        </div>
      )}
    </div>
  )
}
