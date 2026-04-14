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
