import { Hono } from 'hono'

export const analyticsRoutes = new Hono()

analyticsRoutes.post('/analytics/run-daily', async (c) => {
  // TODO: implement LLM-driven summary generation over recent metrics.
  return c.json({ queued: true })
})
