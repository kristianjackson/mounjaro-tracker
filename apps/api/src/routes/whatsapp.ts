import { Hono } from 'hono'
import { parseWhatsAppWebhook } from '../domain/whatsapp'
import { insertIncomingMessageEvent, upsertUser } from '../storage/repositories'

type Env = {
  Bindings: {
    DB: D1Database
    WHATSAPP_VERIFY_TOKEN?: string
  }
}

export const whatsappRoutes = new Hono<Env>()

whatsappRoutes.get('/webhooks/whatsapp', (c) => {
  const mode = c.req.query('hub.mode')
  const token = c.req.query('hub.verify_token')
  const challenge = c.req.query('hub.challenge')

  if (mode === 'subscribe' && token && token === c.env.WHATSAPP_VERIFY_TOKEN) {
    return c.text(challenge ?? '', 200)
  }

  return c.text('verification failed', 403)
})

whatsappRoutes.post('/webhooks/whatsapp', async (c) => {
  const payload = await c.req.json().catch(() => ({}))
  const messages = parseWhatsAppWebhook(payload)

  for (const message of messages) {
    await upsertUser(c.env.DB, message.from, message.contactName)
    await insertIncomingMessageEvent(c.env.DB, message)
  }

  return c.json({ received: true, processed: messages.length })
})
