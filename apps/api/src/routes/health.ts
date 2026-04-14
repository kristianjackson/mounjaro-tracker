import { Hono } from 'hono'

export const healthRoutes = new Hono()

healthRoutes.get('/health', (c) => {
  return c.json({ ok: true, service: 'mounjaro-tracker-api', date: new Date().toISOString() })
})
