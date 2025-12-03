# Challenge Setup Instructions

## What's Included

1. **Legacy Code** (in `src/`)
   - `pricingData.ts` - Current deeply nested pricing configuration
   - `TableInfo.tsx` - Component with complex conditional logic
   - `StagesBanner.tsx` - Component with hardcoded special cases
   - `example-usage.ts` - Shows the pain of adding new models (has intentional errors!)

2. **Type Definitions** (in `types/`)
   - `index.ts` - DO NOT MODIFY - These represent our API contract

3. **Tests** (in `tests/`)
   - `example.test.ts` - Test cases your solution should pass

4. **Documentation**
   - `README.md` - The main challenge description
   - This file - Setup instructions

## Notes for Candidates

- The `example-usage.ts` file intentionally has TypeScript errors to demonstrate the current problems
- Jest types are not installed - focus on the refactoring, not test setup
- The components use simplified className strings instead of full Tailwind classes for clarity
- Your refactored solution should maintain compatibility with the existing type definitions

## Getting Started

1. Review the README.md for the full challenge description
2. Examine the legacy code to understand the current pain points
3. Design your refactoring approach
4. Implement your solution
5. Document your decisions in SOLUTION.md

## Time Expectation

2-4 hours for a complete solution including documentation.

Good luck!