# WhatsApp Command Grammar (MVP)

This is the canonical command grammar for metric logging via `POST /webhooks/whatsapp`.

## Parsing rules
- Commands are case-insensitive.
- Multiple spaces are collapsed.
- Unknown commands are stored as `notes`.
- Invalid numeric values return a parse failure (`null` from parser) and should not update metrics.

## Supported commands

## Weight
- Forms:
  - `weight <number>` (assumes pounds)
  - `weight <number> lb|lbs|pound|pounds`
  - `weight <number> kg|kgs`
  - `wt <number> [unit]`
- Stored field: `weight_kg`
- Conversion: pounds → kilograms (`* 0.45359237`, rounded to 2 decimals)

Examples:
- `weight 209.4`
- `weight 95 kg`
- `wt 212 lbs`

## Glucose
- Forms:
  - `glucose <number>`
  - `bg <number>`
- Stored field: `fasting_glucose_mg_dl`
- Must be `> 0`.

Examples:
- `glucose 96`
- `bg 102`

## Sleep
- Form: `sleep <number>`
- Stored field: `sleep_hours`
- Valid range: `> 0` and `<= 24`

Examples:
- `sleep 7.5`
- `sleep 6`

## Appetite
- Form: `appetite <integer 1-10>`
- Stored field: `appetite_score`

## Side effects
- Forms:
  - `sidefx <integer 1-10>`
  - `sideeffect <integer 1-10>`
  - `sideeffects <integer 1-10>`
- Stored field: `side_effect_score`

## Notes fallback
- Any non-empty message that does not match a known command is treated as:
  - field: `notes`
  - value: original normalized text
