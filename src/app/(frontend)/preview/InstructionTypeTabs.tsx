'use client'

import { useState } from 'react'
import { StepList, type NormalizedStep } from './StepComponents'
import { DetailedToggle } from './DetailedToggle'
import { SubStepNavigator, type NormalizedSubStep } from './SubStepNavigator'

type Props = {
  activate?: {
    base: NormalizedStep[]
    detailed: NormalizedStep[]
    subSteps: NormalizedSubStep[]
    manual?: { base: NormalizedStep[]; detailed: NormalizedStep[] }
    apnSettings?: { base: NormalizedStep[]; detailed: NormalizedStep[] }
  }
  connect?: { base: NormalizedStep[]; detailed: NormalizedStep[] }
}

function SectionDivider({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '2rem 0 1.25rem' }}>
      <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
      <span style={{
        fontSize: '0.65rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: accent,
        background: '#f3f4f6',
        padding: '0.2rem 0.6rem',
        borderRadius: '4px',
        border: `1px solid ${accent}33`,
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
    </div>
  )
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
          {activate.base.length > 0 && (
            <>
              <SectionDivider label="Base Steps" accent="#2563eb" />
              <StepList steps={activate.base} />
            </>
          )}

          {activate.detailed.length > 0 && (
            <>
              <SectionDivider label="Detailed Steps" accent="#6366f1" />
              <DetailedToggle steps={activate.detailed} />
            </>
          )}

          {activate.subSteps.length > 0 && (
            <>
              <SectionDivider label="Sub-steps" accent="#7c3aed" />
              <SubStepNavigator subSteps={activate.subSteps} />
            </>
          )}

          {activate.manual && (activate.manual.base.length > 0 || activate.manual.detailed.length > 0) && (
            <>
              <SectionDivider label="Manual Installation" accent="#b45309" />
              <StepList steps={activate.manual.base} />
              <DetailedToggle steps={activate.manual.detailed} />
            </>
          )}

          {activate.apnSettings && (activate.apnSettings.base.length > 0 || activate.apnSettings.detailed.length > 0) && (
            <>
              <SectionDivider label="APN Settings" accent="#0f766e" />
              <StepList steps={activate.apnSettings.base} />
              <DetailedToggle steps={activate.apnSettings.detailed} />
            </>
          )}
        </>
      )}

      {active === 'connect' && connect && (
        <>
          {connect.base.length > 0 && (
            <>
              <SectionDivider label="Base Steps" accent="#0d9488" />
              <StepList steps={connect.base} />
            </>
          )}

          {connect.detailed.length > 0 && (
            <>
              <SectionDivider label="Detailed Steps" accent="#0891b2" />
              <DetailedToggle steps={connect.detailed} />
            </>
          )}
        </>
      )}
    </div>
  )
}
