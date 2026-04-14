export type ParsedWhatsAppMessage = {
  messageId: string
  from: string
  timestamp: number
  contactName?: string
  type: string
  text?: string
  payload: Record<string, unknown>
}

type UnknownRecord = Record<string, unknown>

const isRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === 'object' && value !== null
}

const toObjectArray = (value: unknown): UnknownRecord[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(isRecord)
}

const toText = (value: unknown): string | undefined => {
  return typeof value === 'string' ? value : undefined
}

const toTimestamp = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return Math.floor(Date.now() / 1000)
}

const extractMessageText = (message: UnknownRecord): string | undefined => {
  const msgType = toText(message.type)

  if (msgType === 'text') {
    const textObj = isRecord(message.text) ? message.text : undefined
    return toText(textObj?.body)
  }

  if (msgType === 'button') {
    const buttonObj = isRecord(message.button) ? message.button : undefined
    return toText(buttonObj?.text)
  }

  if (msgType === 'interactive') {
    const interactive = isRecord(message.interactive) ? message.interactive : undefined
    const buttonReply = isRecord(interactive?.button_reply) ? interactive?.button_reply : undefined
    const listReply = isRecord(interactive?.list_reply) ? interactive?.list_reply : undefined

    return toText(buttonReply?.title) ?? toText(listReply?.title)
  }

  return undefined
}

export const parseWhatsAppWebhook = (payload: unknown): ParsedWhatsAppMessage[] => {
  if (!isRecord(payload)) {
    return []
  }

  const entries = toObjectArray(payload.entry)
  const results: ParsedWhatsAppMessage[] = []

  for (const entry of entries) {
    const changes = toObjectArray(entry.changes)

    for (const change of changes) {
      const value = isRecord(change.value) ? change.value : undefined
      if (!value) {
        continue
      }

      const contacts = toObjectArray(value.contacts)
      const contactByWaId = new Map<string, string>()

      for (const contact of contacts) {
        const waId = toText(contact.wa_id)
        const profile = isRecord(contact.profile) ? contact.profile : undefined
        const name = toText(profile?.name)
        if (waId && name) {
          contactByWaId.set(waId, name)
        }
      }

      const messages = toObjectArray(value.messages)
      for (const message of messages) {
        const from = toText(message.from)
        const id = toText(message.id)

        if (!from || !id) {
          continue
        }

        const type = toText(message.type) ?? 'unknown'
        results.push({
          messageId: id,
          from,
          timestamp: toTimestamp(message.timestamp),
          contactName: contactByWaId.get(from),
          type,
          text: extractMessageText(message),
          payload: message
        })
      }
    }
  }

  return results
}
