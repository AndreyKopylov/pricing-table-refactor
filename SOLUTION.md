# Solution

## Approach

Went with a config-driven approach. All models live in one file as plain objects, and a generator builds the `TradingData` from that.

Considered Builder/Factory but felt like overkill for 3 models. Can revisit if we ever have 50+ with different structures.

## What I changed

**New files:**

* `src/config/types.ts` — `ModelConfig`, `FieldConfig`, `RoleType` interfaces
* `src/config/models.ts` — all model definitions in one place
* `src/config/constants.ts` — shared defaults, constants (`PAYOUT_CYCLES`, `CONTRACT_TYPES`, `DASH`)
* `src/config/tableFields.ts` — declarative config for table fields with `showByConditions`
* `src/config/index.ts` — barrel exports for clean imports
* `src/utils/calculations.ts` — percentage/scaling/currency helpers
* `src/generators/generateData.ts` — generates TradingData from config

**Refactored:**

* `pricingData.ts` — now just exports generated data (was 276 lines, now ~10)
* `TableInfo.tsx` — uses field config instead of hardcoded conditionals, removed unused props
* `StagesBanner.tsx` — removed special case for Zero (dead code), removed unused props

## Adding a new model

Before: touch 5 files, copy-paste data everywhere, hope you don't mess up percentages.

Now just add an object to `models.ts`:

```typescript
{
  id: 'fundingticks_elite',
  name: 'FundingTicks Elite',
  stepKey: 'elite',
  stepName: 'Elite',
  pricing: { '25000': 149, '50000': 249, '100000': 399 },
  recurring: true,
  discount: 20,
  profitTargetPercent: 8,
  maxLossPercent: 4,
  payoutCycle: PAYOUT_CYCLES.TRADING_7,
  roles: ['student', 'master'],
}
```

That's it. The generator handles the rest.

## Key design decisions

* **`showByConditions` is optional** — fields without it always show (defaults to `true`)
* **`formatCurrency` uses Intl.NumberFormat** — proper locale-aware formatting with thousands separators
* **Barrel exports** — clean imports via `from "./config"` instead of individual files
* **Types separated** — `ModelConfig` and `FieldConfig` live in dedicated `types.ts`

## Trade-offs

* **`id` and `stepKey` must exist in types** — adding a truly new model requires updating `types/index.ts`, but that's the API contract. TypeScript catches invalid values at compile time.
* **Single config file** — could split per model, but seeing everything together makes comparison easier.

## What I would do with more time

* Runtime validation for model config (Zod schema)
* Unit tests for the generator

