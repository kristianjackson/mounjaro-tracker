# Step 3 Instructions: Meta WhatsApp Webhook Signature Verification

Use these steps to add and validate webhook signature verification in the Hono Worker.

## Goal
Reject any inbound webhook request that does not have a valid Meta `X-Hub-Signature-256` signature.

## Prerequisites
1. Add your WhatsApp app secret as a Worker secret:
   - `wrangler secret put WHATSAPP_APP_SECRET`
2. Confirm Meta sends `X-Hub-Signature-256` header to your webhook endpoint.

## Implementation outline
1. Create middleware at `apps/api/src/middleware/verifyMetaSignature.ts`.
2. Middleware logic:
   - read raw request body as `ArrayBuffer`
   - compute `HMAC-SHA256(rawBody, WHATSAPP_APP_SECRET)`
   - format expected signature as `sha256=<hex>`
   - compare against `X-Hub-Signature-256` in constant time
   - reject with `401` if missing/invalid
3. Apply middleware only to `POST /webhooks/whatsapp`.

## Pseudocode
```ts
const received = c.req.header('x-hub-signature-256')
const raw = await c.req.arrayBuffer()
const expected = `sha256=${hmacSha256Hex(raw, c.env.WHATSAPP_APP_SECRET)}`
if (!timingSafeEqual(received, expected)) return c.json({ error: 'invalid_signature' }, 401)
```

## Testing checklist
1. Valid signed payload succeeds (`200`).
2. Missing signature returns `401`.
3. Invalid signature returns `401`.
4. Body tampering with same signature returns `401`.
5. Parser and persistence still behave as before after middleware insertion.
