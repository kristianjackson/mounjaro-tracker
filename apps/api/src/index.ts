import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { analyticsRoutes } from './routes/analytics'
import { healthRoutes } from './routes/health'
import { whatsappRoutes } from './routes/whatsapp'

type Env = {
  Bindings: {
    DB: D1Database
    WHATSAPP_VERIFY_TOKEN?: string
  }
}

const app = new Hono<Env>()

app.use('*', logger())
app.route('/', healthRoutes)
app.route('/', whatsappRoutes)
app.route('/', analyticsRoutes)

app.notFound((c) => c.json({ error: 'not_found' }, 404))

app.onError((err, c) => {
  console.error('unhandled_error', err)
  return c.json({ error: 'internal_error' }, 500)
})

export default app
