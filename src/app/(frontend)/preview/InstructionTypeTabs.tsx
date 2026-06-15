'use client'

import { useState } from 'react'
import { StepList, type NormalizedStep } from './StepComponents'
import { DetailedToggle } from './DetailedToggle'
import { SubStepNavigator, type NormalizedSubStep } from './SubStepNavigator'

type Props = {
  activate?: { base: NormalizedStep[]; detailed: NormalizedStep[]; subSteps: NormalizedSubStep[] }
  connect?: { base: NormalizedStep[]; detailed: NormalizedStep[] }
}

export function InstructionTypeTabs({ activate, connect }: Props) {
  const hasBoth = !!activate && !!connect
  const [active, setActive] = useState<'activate' | 'connect'>(activate ? 'activate' : 'connect')

  const tabStyle = (type: 'activate' | 'connect'): React.CSSProperties => {
    const isActive = active === type
    const bg = type === 'activate' ? '#2563eb' : '#0d9488'
    return {
      padding: '0.4rem 1rem',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      background: isActive ? bg : '#e5e7eb',
      color: isActive ? '#fff' : '#6b7280',
      transition: 'background 0.15s, color 0.15s',
    }
  }

  return (
    <div>
      {hasBoth && (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem' }}>
          <button style={tabStyle('activate')} onClick={() => setActive('activate')}>Activate</button>
          <button style={tabStyle('connect')} onClick={() => setActive('connect')}>Connect</button>
        </div>
      )}

      {active === 'activate' && activate && (
        <>
          <StepList steps={activate.base} />
          <DetailedToggle steps={activate.detailed} />
          {activate.subSteps.length > 0 && <SubStepNavigator subSteps={activate.subSteps} />}
        </>
      )}

      {active === 'connect' && connect && (
        <>
          <StepList steps={connect.base} />
          <DetailedToggle steps={connect.detailed} />
        </>
      )}
    </div>
  )
}
