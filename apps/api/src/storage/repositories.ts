import type { ParsedWhatsAppMessage } from '../domain/whatsapp'

export const upsertUser = async (db: D1Database, phone: string, displayName?: string) => {
  await db
    .prepare(
      `INSERT INTO users (phone, display_name)
       VALUES (?, ?)
       ON CONFLICT(phone) DO UPDATE SET
         display_name = COALESCE(excluded.display_name, users.display_name),
         updated_at = CURRENT_TIMESTAMP`
    )
    .bind(phone, displayName ?? null)
    .run()
}

export const insertIncomingMessageEvent = async (db: D1Database, message: ParsedWhatsAppMessage) => {
  await db
    .prepare(
      `INSERT OR IGNORE INTO events (
        external_id,
        user_phone,
        event_type,
        occurred_at,
        payload_json
      ) VALUES (?, ?, ?, datetime(?, 'unixepoch'), ?)`
    )
    .bind(
      message.messageId,
      message.from,
      `whatsapp_${message.type}`,
      message.timestamp,
      JSON.stringify({
        text: message.text,
        contactName: message.contactName,
        rawMessage: message.payload
      })
    )
    .run()
}
