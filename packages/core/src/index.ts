export type MetricEntry = {
  userId: string
  date: string
  weightKg?: number
  fastingGlucoseMgDl?: number
  sleepHours?: number
  appetiteScore?: number
  sideEffectScore?: number
  notes?: string
}

export type EventLog = {
  userId: string
  occurredAt: string
  type: 'medication' | 'symptom' | 'meal' | 'exercise' | 'other'
  payload: Record<string, unknown>
}

export type QuickLogUpdate =
  | { field: 'weight_kg'; value: number }
  | { field: 'fasting_glucose_mg_dl'; value: number }
  | { field: 'sleep_hours'; value: number }
  | { field: 'appetite_score'; value: number }
  | { field: 'side_effect_score'; value: number }
  | { field: 'notes'; value: string }

const readFloat = (value: string): number | undefined => {
  const parsed = Number.parseFloat(value)
  if (!Number.isFinite(parsed)) {
    return undefined
  }

  return parsed
}

const readScore = (value: string): number | undefined => {
  const parsed = Number.parseInt(value, 10)
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 10) {
    return undefined
  }

  return parsed
}

export const parseQuickLogUpdate = (text: string): QuickLogUpdate | null => {
  const normalized = text.trim().replace(/\s+/g, ' ')
  if (!normalized) {
    return null
  }

  const parts = normalized.split(' ')
  if (parts.length < 2) {
    return { field: 'notes', value: normalized }
  }

  const keyword = parts[0].toLowerCase()
  const valueText = parts.slice(1).join(' ')

  if (keyword === 'weight') {
    const pounds = readFloat(valueText)
    if (pounds === undefined) {
      return null
    }

    return {
      field: 'weight_kg',
      value: Number((pounds * 0.45359237).toFixed(2))
    }
  }

  if (keyword === 'glucose') {
    const glucose = readFloat(valueText)
    if (glucose === undefined) {
      return null
    }

    return { field: 'fasting_glucose_mg_dl', value: glucose }
  }

  if (keyword === 'sleep') {
    const sleep = readFloat(valueText)
    if (sleep === undefined) {
      return null
    }

    return { field: 'sleep_hours', value: sleep }
  }

  if (keyword === 'appetite') {
    const appetite = readScore(valueText)
    if (appetite === undefined) {
      return null
    }

    return { field: 'appetite_score', value: appetite }
  }

  if (keyword === 'sidefx' || keyword === 'sideeffect') {
    const score = readScore(valueText)
    if (score === undefined) {
      return null
    }

    return { field: 'side_effect_score', value: score }
  }

  return { field: 'notes', value: normalized }
}
