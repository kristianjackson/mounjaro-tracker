import { Hono } from 'hono'
import { logger } from 'hono/logger'

type Env = {
  Bindings: {
    DB: D1Database
    WHATSAPP_VERIFY_TOKEN?: string
  }
}

const app = new Hono<Env>()

app.use('*', logger())

app.get('/health', (c) => {
  return c.json({ ok: true, service: 'mounjaro-tracker-api', date: new Date().toISOString() })
})

app.get('/webhooks/whatsapp', (c) => {
  const mode = c.req.query('hub.mode')
  const token = c.req.query('hub.verify_token')
  const challenge = c.req.query('hub.challenge')

  if (mode === 'subscribe' && token && token === c.env.WHATSAPP_VERIFY_TOKEN) {
    return c.text(challenge ?? '', 200)
  }

  return c.text('verification failed', 403)
})

app.post('/webhooks/whatsapp', async (c) => {
  const payload = await c.req.json().catch(() => ({}))

  // TODO: parse incoming message and persist normalized event rows.
  // Keep this endpoint fast; enqueue analytics work asynchronously.
  console.log('incoming_whatsapp_payload', JSON.stringify(payload))

  return c.json({ received: true })
})

app.post('/analytics/run-daily', async (c) => {
  // TODO: implement LLM-driven summary generation over recent metrics.
  return c.json({ queued: true })
})

export default app
