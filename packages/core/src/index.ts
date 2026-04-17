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

const NUMERIC_PATTERN = /^[-+]?\d+(?:\.\d+)?$/

const normalize = (text: string): string => text.trim().replace(/\s+/g, ' ')

const parseNumber = (text: string): number | undefined => {
  if (!NUMERIC_PATTERN.test(text)) {
    return undefined
  }

  const parsed = Number.parseFloat(text)
  if (!Number.isFinite(parsed)) {
    return undefined
  }

  return parsed
}

const parseScore = (text: string): number | undefined => {
  const parsed = Number.parseInt(text, 10)
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 10) {
    return undefined
  }

  return parsed
}

const parseWeight = (valueText: string): number | undefined => {
  const match = valueText.toLowerCase().match(/^(?<value>[-+]?\d+(?:\.\d+)?)(?:\s*(?<unit>kg|kgs|lb|lbs|pound|pounds))?$/)
  if (!match?.groups?.value) {
    return undefined
  }

  const value = parseNumber(match.groups.value)
  if (value === undefined || value <= 0) {
    return undefined
  }

  const unit = match.groups.unit ?? 'lb'
  if (unit === 'kg' || unit === 'kgs') {
    return Number(value.toFixed(2))
  }

  return Number((value * 0.45359237).toFixed(2))
}

export const parseQuickLogUpdate = (text: string): QuickLogUpdate | null => {
  const normalized = normalize(text)
  if (!normalized) {
    return null
  }

  const parts = normalized.split(' ')
  if (parts.length < 2) {
    return { field: 'notes', value: normalized }
  }

  const keyword = parts[0].toLowerCase()
  const valueText = parts.slice(1).join(' ')

  if (keyword === 'weight' || keyword === 'wt') {
    const kg = parseWeight(valueText)
    return kg === undefined ? null : { field: 'weight_kg', value: kg }
  }

  if (keyword === 'glucose' || keyword === 'bg') {
    const glucose = parseNumber(valueText)
    if (glucose === undefined || glucose <= 0) {
      return null
    }

    return { field: 'fasting_glucose_mg_dl', value: Number(glucose.toFixed(1)) }
  }

  if (keyword === 'sleep') {
    const sleep = parseNumber(valueText)
    if (sleep === undefined || sleep <= 0 || sleep > 24) {
      return null
    }

    return { field: 'sleep_hours', value: Number(sleep.toFixed(2)) }
  }

  if (keyword === 'appetite') {
    const appetite = parseScore(valueText)
    return appetite === undefined ? null : { field: 'appetite_score', value: appetite }
  }

  if (keyword === 'sidefx' || keyword === 'sideeffect' || keyword === 'sideeffects') {
    const score = parseScore(valueText)
    return score === undefined ? null : { field: 'side_effect_score', value: score }
  }

  return { field: 'notes', value: normalized }
}
