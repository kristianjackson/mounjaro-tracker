# Parser Test Matrix (Step 2)

This matrix is intended to be copied into automated unit tests for `parseQuickLogUpdate`.

## Happy path cases
| Input | Expected |
|---|---|
| `weight 209.4` | `{ field: 'weight_kg', value: 94.98 }` |
| `weight 95 kg` | `{ field: 'weight_kg', value: 95 }` |
| `wt 212 lbs` | `{ field: 'weight_kg', value: 96.16 }` |
| `glucose 96` | `{ field: 'fasting_glucose_mg_dl', value: 96 }` |
| `bg 102` | `{ field: 'fasting_glucose_mg_dl', value: 102 }` |
| `sleep 7.5` | `{ field: 'sleep_hours', value: 7.5 }` |
| `appetite 4` | `{ field: 'appetite_score', value: 4 }` |
| `sidefx 3` | `{ field: 'side_effect_score', value: 3 }` |
| `Had nausea after dinner` | `{ field: 'notes', value: 'Had nausea after dinner' }` |

## Rejection cases
| Input | Expected |
|---|---|
| `weight -2` | `null` |
| `weight abc` | `null` |
| `sleep 0` | `null` |
| `sleep 30` | `null` |
| `appetite 11` | `null` |
| `sidefx 0` | `null` |
| `` (empty string) | `null` |

## Suggested assertion style
For floating-point conversions, use exact expected values from parser rounding:
- weight to kg: rounded to 2 decimals
- glucose: rounded to 1 decimal
- sleep: rounded to 2 decimals
