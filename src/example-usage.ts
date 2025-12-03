// EXAMPLE: How we currently have to add a new model
// This demonstrates the pain points of the current system
// NOTE: This file intentionally has TypeScript errors to show the problems!

import { pricingTableData, modelsMap, stepsMap } from './pricingData'
import { Models, TradingData } from '../types'

// Step 1: Add to modelsMap (but we can't because it's not extensible!)
// modelsMap['fundingticks_elite'] = 'FundingTicks Elite' // ❌ Type error!

// Step 2: Add to stepsMap (same problem)
// stepsMap['fundingticks_elite'] = [{ key: 'elite', name: 'Elite' }] // ❌ Type error!

// Step 3: Add pricing data for EACH account size with tons of repetition
function addEliteModel() {
  // We have to manually calculate and repeat everything!
  
  // For $25,000 account
  pricingTableData['25000'].steps.elite = {
    price: 1,
    total_cost: 149,
    recurring: true,
    discount: 40,
    roles: [
      {
        role: 'student',
        isFunded: false,
        data: {
          minimum_trading_days: '5',
          trading_period: 'Unlimited',
          maximum_daily_loss: '$500', // Have to calculate 2% manually
          maximum_overall_loss: '$1000', // Have to calculate 4% manually
          profit_target: '$2000', // Have to calculate 8% manually
          consistency: '30%',
          max_contracts: '2', // Have to figure out scaling manually
          reward_cap: '$10000',
        },
      },
      {
        role: 'master',
        isFunded: true,
        data: {
          trading_period: 'Unlimited',
          maximum_daily_loss: '$500',
          maximum_overall_loss: '$1000',
          payouts_profit_split: 'Every 3 days at 95% split',
          max_contracts: '2',
          activation_fee: '-',
          reward_cap: '-',
        },
      },
    ],
  }

  // For $50,000 account - MORE REPETITION!
  pricingTableData['50000'].steps.elite = {
    price: 1,
    total_cost: 249,
    recurring: true,
    discount: 40,
    roles: [
      {
        role: 'student',
        isFunded: false,
        data: {
          minimum_trading_days: '5', // Same as above
          trading_period: 'Unlimited', // Same as above
          maximum_daily_loss: '$1000', // Have to recalculate
          maximum_overall_loss: '$2000', // Have to recalculate
          profit_target: '$4000', // Have to recalculate
          consistency: '30%', // Same as above
          max_contracts: '4', // Have to recalculate
          reward_cap: '$10000', // Same as above
        },
      },
      {
        role: 'master',
        isFunded: true,
        data: {
          trading_period: 'Unlimited',
          maximum_daily_loss: '$1000',
          maximum_overall_loss: '$2000',
          payouts_profit_split: 'Every 3 days at 95% split', // Same as above
          max_contracts: '4',
          activation_fee: '-',
          reward_cap: '-',
        },
      },
    ],
  }

  // For $100,000 account - EVEN MORE REPETITION!
  pricingTableData['100000'].steps.elite = {
    price: 1,
    total_cost: 399,
    recurring: true,
    discount: 40,
    roles: [
      {
        role: 'student',
        isFunded: false,
        data: {
          minimum_trading_days: '5',
          trading_period: 'Unlimited',
          maximum_daily_loss: '$2000',
          maximum_overall_loss: '$4000',
          profit_target: '$8000',
          consistency: '30%',
          max_contracts: '8',
          reward_cap: '$10000',
        },
      },
      {
        role: 'master',
        isFunded: true,
        data: {
          trading_period: 'Unlimited',
          maximum_daily_loss: '$2000',
          maximum_overall_loss: '$4000',
          payouts_profit_split: 'Every 3 days at 95% split',
          max_contracts: '8',
          activation_fee: '-',
          reward_cap: '-',
        },
      },
    ],
  }
}

// Step 4: Update components with hardcoded checks
// In TableInfo.tsx, we'd need to add:
// if (model === 'fundingticks_elite') { /* special logic */ }

// Step 5: Update StagesBanner.tsx with more special cases
// if (model === 'fundingticks_elite') { /* more special logic */ }

// This is clearly not scalable or maintainable!