# Technical Challenge: Pricing Table Refactor

## Background

You've joined our team and inherited a legacy pricing table system that's become difficult to maintain. The current implementation has several pain points:

1. **Deep nesting** - Data is nested 4-5 levels deep making it hard to update
2. **Repetition** - Similar data is repeated across account sizes with minor variations
3. **Hardcoded logic** - Special cases are scattered throughout components
4. **Type safety issues** - Uses unsafe type casting (`as any`)
5. **Poor scalability** - Adding a new model requires changes in multiple files

## Your Task

Refactor this pricing table system to improve the developer experience. We're looking for:

- **Better data modeling** - Reduce repetition and make it easier to add new models
- **Improved type safety** - Eliminate unsafe type access
- **Cleaner component logic** - Remove hardcoded special cases where possible
- **Scalability** - Make it simple to add new pricing models
- **Maintainability** - Clear patterns that other developers can follow

## Current Structure

```
src/
├── pricingData.ts      # Deeply nested pricing configuration
├── TableInfo.tsx       # Component with complex conditional rendering
├── StagesBanner.tsx    # Component with hardcoded special cases
types/
└── index.ts           # Type definitions (DO NOT MODIFY)
```

## Example: Adding a New Model

Currently, to add a new model like "FundingTicks Elite", you need to:

1. Add it to `modelsMap` in pricingData.ts
2. Add it to `stepsMap` in pricingData.ts
3. Add pricing data for all account sizes (with lots of repetition)
4. Update hardcoded checks in TableInfo.tsx
5. Potentially add special cases in StagesBanner.tsx
6. Update type definitions

This is error-prone and time-consuming!

## Constraints

- The `types/index.ts` file MUST NOT be modified (it represents our API contract)
- The final data structure must be compatible with the existing `TradingData` type
- Components should maintain the same props interface

## Suggestions (not requirements)

Consider patterns like:

- Builder pattern for constructing pricing data
- Factory functions for common configurations
- Configuration objects to reduce hardcoding
- Composition to reduce repetition
- Better separation of concerns

## Evaluation Criteria

We'll evaluate your solution based on:

1. **Code Quality** - Is the code clean, readable, and well-structured?
2. **Type Safety** - Have you improved type safety and eliminated unsafe patterns?
3. **Developer Experience** - How easy is it to add a new model now?
4. **Scalability** - Does your solution scale well as we add more models?
5. **Documentation** - Have you explained your design decisions?

## Submission

1. Refactor the code in this folder
2. Add a `SOLUTION.md` file explaining:
   - Your approach and design decisions
   - How to add a new model using your system
   - Any trade-offs you made
   - What you would do differently with more time

## Time Expectation

This challenge should take 2-4 hours. We're more interested in your approach and thinking than a perfect solution.

Good luck! We're excited to see your approach to improving this system.
