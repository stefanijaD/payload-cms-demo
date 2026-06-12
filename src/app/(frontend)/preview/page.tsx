import { getPayload } from 'payload'
import config from '@/payload.config'
import { LocaleSwitcher } from './LocaleSwitcher'
import { typeBadgeStyle, type NormalizedStep } from './StepComponents'
import { type NormalizedSubStep } from './SubStepNavigator'
import { InstructionTypeTabs } from './InstructionTypeTabs'


function normalizeMedia(media: any) {
  if (!media || typeof media === 'number') return null
  return { url: media.url ?? null, width: media.width ?? null, height: media.height ?? null }
}

function normalizeSharedStep(step: any): NormalizedStep | null {
  if (!step || typeof step === 'number') return null
  return { name: step.name ?? null, description: step.description ?? null, media: normalizeMedia(step.media) }
}

function normalizeStepItem(item: any): NormalizedStep[] {
  if (!item) return []
  if (item.source === 'inline') {
    return [{ name: item.inline?.name ?? null, description: item.inline?.description ?? null, media: normalizeMedia(item.inline?.media) }]
  }
  if (item.source === 'sharedStep') {
    const step = normalizeSharedStep(item.sharedStep)
    return step ? [step] : []
  }
  if (item.source === 'sharedStepGroup') {
    const group = item.sharedStepGroup
    if (!group || typeof group === 'number' || !Array.isArray(group.steps)) return []
    return group.steps.map((g: any) => normalizeSharedStep(g.step)).filter(Boolean) as NormalizedStep[]
  }
  return []
}

function normalizeStepList(items: any[] | null | undefined): NormalizedStep[] {
  if (!Array.isArray(items)) return []
  return items.flatMap(normalizeStepItem)
}


const pageStyle: React.CSSProperties = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  minHeight: '100vh',
  background: '#f3f4f6',
}

const innerStyle: React.CSSProperties = {
  maxWidth: '640px',
  margin: '0 auto',
  padding: '2rem 1rem 4rem',
  color: '#111',
}


async function IndexPage() {
  const payload = await getPayload({ config: await config })
  const result = await payload.find({
    collection: 'instructions',
    limit: 200,
    depth: 0,
  })

  const grouped: Record<string, { instructionType: string }[]> = {}
  for (const doc of result.docs as any[]) {
    if (!grouped[doc.phoneModel]) grouped[doc.phoneModel] = []
    grouped[doc.phoneModel].push({ instructionType: doc.instructionType })
  }
  const models = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))

  return (
    <div style={pageStyle}>
      <div style={innerStyle}>
        <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.4rem', fontWeight: 700 }}>Instructions</h1>
        <p style={{ margin: '0 0 2rem', color: '#6b7280', fontSize: '0.875rem' }}>
          {models.length} phone model{models.length !== 1 ? 's' : ''}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {models.map(([model, docs]) => (
            <a
              key={model}
              href={`/preview?model=${encodeURIComponent(model)}&locale=en`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                background: '#fff',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <span style={{ fontWeight: 600, fontSize: '0.9rem', flex: 1, color: '#111' }}>{model}</span>
              <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
                {docs.map((d, i) => (
                  <span key={i} style={typeBadgeStyle(d.instructionType)}>{d.instructionType}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}


async function ModelPage({ model, locale }: { model: string; locale: string }) {
  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: 'instructions',
    depth: 5,
    locale: locale as any,
    fallbackLocale: 'en',
    limit: 10,
    where: { phoneModel: { equals: model } },
  })

  if (!result.docs.length) {
    return (
      <div style={pageStyle}>
        <div style={innerStyle}>
          <a href="/preview" style={{ fontSize: '0.85rem', color: '#2563eb', textDecoration: 'none' }}>← All models</a>
          <p style={{ color: '#dc2626', marginTop: '1rem' }}>No instructions found for <strong>{model}</strong>.</p>
        </div>
      </div>
    )
  }

  const activate = (result.docs as any[]).find((d) => d.instructionType === 'activate')
  const connect = (result.docs as any[]).find((d) => d.instructionType === 'connect')

  const connectSubSteps: NormalizedSubStep[] = (connect?.connect?.subSteps ?? []).map((ss: any) => ({
    key: ss.key,
    base: normalizeStepList(ss.base),
    detailed: normalizeStepList(ss.detailed),
  }))

  return (
    <div style={pageStyle}>
      <div style={innerStyle}>
        <div style={{ marginBottom: '2rem' }}>
          <a href="/preview" style={{ fontSize: '0.85rem', color: '#2563eb', textDecoration: 'none' }}>← All models</a>
        </div>

        <header style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <LocaleSwitcher currentLocale={locale} />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{model}</h1>
        </header>

        <InstructionTypeTabs
          activate={activate ? {
            base: normalizeStepList(activate.activate?.base),
            detailed: normalizeStepList(activate.activate?.detailed),
          } : undefined}
          connectSubSteps={connectSubSteps.length > 0 ? connectSubSteps : undefined}
        />
      </div>
    </div>
  )
}


export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string; locale?: string }>
}) {
  const { model, locale = 'en' } = await searchParams
  const adminLink = (
    <a
      href="/admin/collections/instructions"
      title="Back to admin"
      style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '2rem',
        borderRadius: '6px',
        background: '#fff',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        color: '#374151',
        textDecoration: 'none',
        fontSize: '0.8rem',
        fontWeight: 500,
        padding: '0 0.65rem',
        gap: '0.3rem',
      }}
    >
      ← Admin
    </a>
  )

  if (!model) return <>{adminLink}<IndexPage /></>
  return <>{adminLink}<ModelPage model={model} locale={locale} /></>
}
