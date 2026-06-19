import { getPayload } from 'payload'
import config from '@payload-config'
import { interpolateText } from '@/lib/interpolate'

type InstructionType = 'activate' | 'connect'

type NormalizedMedia =
    | {
        id: number
        url?: string | null
        filename?: string | null
        mimeType?: string | null
        width?: number | null
        height?: number | null
    }
    | null

type NormalizedStep = {
    name?: string | null
    description?: string | null
    media?: NormalizedMedia
}

function normalizeMedia(media: any): NormalizedMedia {
    if (!media || typeof media === 'number') {
        return null
    }

    return {
        id: media.id,
        url: media.url ?? null,
        filename: media.filename ?? null,
        mimeType: media.mimeType ?? null,
        width: media.width ?? null,
        height: media.height ?? null,
    }
}

function normalizeSharedStep(step: any): NormalizedStep | null {
    if (!step || typeof step === 'number') {
        return null
    }

    return {
        name: step.name ?? null,
        description: step.description ?? null,
        media: normalizeMedia(step.media),
    }
}

function normalizeStepItem(item: any): NormalizedStep[] {
    if (!item) {
        return []
    }

    if (item.source === 'inline') {
        return [
            {
                name: item.inline?.name ?? null,
                description: item.inline?.description ?? null,
                media: normalizeMedia(item.inline?.media),
            },
        ]
    }

    if (item.source === 'sharedStep') {
        const step = normalizeSharedStep(item.sharedStep)
        return step ? [step] : []
    }

    if (item.source === 'sharedStepGroup') {
        const group = item.sharedStepGroup

        if (!group || typeof group === 'number' || !Array.isArray(group.steps)) {
            return []
        }

        return group.steps
            .map((groupItem: any) => normalizeSharedStep(groupItem.step))
            .filter(Boolean) as NormalizedStep[]
    }

    return []
}

function normalizeStepList(items: any[] | null | undefined): NormalizedStep[] {
    if (!Array.isArray(items)) {
        return []
    }

    return items.flatMap(normalizeStepItem)
}

function applyInterpolation(steps: NormalizedStep[], partnerName: string): NormalizedStep[] {
    if (!partnerName) return steps
    return steps.map((step) => ({
        ...step,
        name: interpolateText(step.name, partnerName),
        description: interpolateText(step.description, partnerName),
    }))
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const phoneModel = searchParams.get('phoneModel')
    const type = searchParams.get('type') as InstructionType | null
    const locale = searchParams.get('locale') || 'en'
    const partnerName = (searchParams.get('partnerName') ?? '').trim()

    if (!phoneModel) {
        return Response.json(
            { error: 'Missing required query parameter: phoneModel' },
            { status: 400 },
        )
    }

    if (!type || !['activate', 'connect'].includes(type)) {
        return Response.json(
            { error: 'Missing or invalid query parameter: type. Use activate or connect.' },
            { status: 400 },
        )
    }

    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'instructions',
        depth: 5,
        locale: locale as any,
        fallbackLocale: 'en',
        limit: 1,
        where: {
            and: [
                {
                    phoneModel: {
                        equals: phoneModel,
                    },
                },
                {
                    instructionType: {
                        equals: type,
                    },
                },
            ],
        },
    })

    const instruction = result.docs[0]

    if (!instruction) {
        return Response.json(
            {
                error: 'Instruction not found',
                phoneModel,
                type,
                locale,
            },
            { status: 404 },
        )
    }

    // Normalize then apply {{partnerName}} interpolation to all step lists.
    const interp = (items: any[] | null | undefined) =>
        applyInterpolation(normalizeStepList(items), partnerName)

    if (type === 'activate') {
        const activate = instruction.activate

        const subSteps =
            activate?.subSteps?.map((subStep: any) => ({
                key: subStep.key,
                base: interp(subStep.base),
                detailed: interp(subStep.detailed),
            })) ?? []

        return Response.json({
            id: instruction.id,
            phoneModel: instruction.phoneModel,
            instructionType: instruction.instructionType,
            content: {
                base: interp(activate?.base),
                detailed: interp(activate?.detailed),
                manualInstallation: {
                    base: interp(activate?.manualInstallation?.base),
                    detailed: interp(activate?.manualInstallation?.detailed),
                },
                apnSettings: {
                    base: interp(activate?.apnSettings?.base),
                    detailed: interp(activate?.apnSettings?.detailed),
                },
                subSteps,
            },
        })
    }

    return Response.json({
        id: instruction.id,
        phoneModel: instruction.phoneModel,
        instructionType: instruction.instructionType,
        content: {
            base: interp(instruction.connect?.base),
            detailed: interp(instruction.connect?.detailed),
        },
    })
}
