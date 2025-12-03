// LEGACY CODE - Current implementation of pricing data
// This file demonstrates how we currently add new models to the system
// Notice the repetition and manual updates required in multiple places

import { TradingData, ModelsMap, StepsMap } from '../types'

export const modelsMap: ModelsMap = {
  fundingticks_pro: 'FundingTicks Pro',
  fundingticks_zero: 'FundingTicks Zero',
  fundingticks_one_day_pass: 'One Day Pass',
}

export const stepsMap: StepsMap = {
  fundingticks_pro: [{ key: 'one_step_pro_plus', name: 'Pro+' }],
  fundingticks_zero: [{ key: 'zero', name: 'Zero' }],
  fundingticks_one_day_pass: [{ key: 'one_day_pass', name: 'One' }],
}

// Notice the deep nesting and repetition across account sizes
export const pricingTableData: TradingData = {
  '25000': {
    steps: {
      one_step_pro_plus: {
        price: 1,
        total_cost: 99,
        recurring: true,
        discount: 35,
        roles: [
          {
            role: 'student',
            isFunded: false,
            data: {
              minimum_trading_days: '3',
              trading_period: 'Unlimited',
              maximum_daily_loss: '-',
              maximum_overall_loss: '$1000',
              reward_cap: '$5000',
              profit_target: '$1500',
              consistency: '40%',
              max_contracts: '2',
            },
          },
          {
            role: 'master',
            isFunded: true,
            data: {
              trading_period: 'Unlimited',
              maximum_daily_loss: '-',
              maximum_overall_loss: '$1000',
              payouts_profit_split: 'Every 5 trading days at 90% split',
              max_contracts: '2',
              activation_fee: '-',
              reward_cap: '-',
            },
          },
        ],
      },
      zero: {
        price: 1,
        total_cost: 333,
        recurring: false,
        discount: 35,
        roles: [
          {
            role: 'master',
            isFunded: true,
            data: {
              trading_period: 'Unlimited',
              minimum_trading_days: '-',
              maximum_daily_loss: '-',
              maximum_overall_loss: '$1000',
              consistency: '25%',
              max_contracts: '1',
              reward_cap: '-',
              payouts_profit_split: 'Every 7 trading days at 90% split',
            },
          },
        ],
      },
      one_day_pass: {
        price: 112,
        total_cost: 112,
        recurring: true,
        discount: 0,
        roles: [
          {
            role: 'student',
            isFunded: false,
            data: {
              minimum_trading_days: '-',
              trading_period: '1 Day',
              maximum_daily_loss: '$500',
              maximum_overall_loss: '$750',
              profit_target: '$2000',
              consistency: '-',
              max_contracts: '1 Mini or 5 Micros',
              reward_cap: '-',
              activation_fee: '-',
            },
          },
          {
            role: 'master',
            isFunded: true,
            data: {
              trading_period: 'Unlimited',
              maximum_daily_loss: '$500',
              maximum_overall_loss: '$750',
              payouts_profit_split: 'Every 7 calendar days at 90% split',
              max_contracts: '1 Mini or 5 Micros',
              activation_fee: '-',
              reward_cap: '-',
            },
          },
        ],
      },
    },
  },
  '50000': {
    steps: {
      one_step_pro_plus: {
        price: 1,
        total_cost: 125,
        recurring: true,
        discount: 35,
        roles: [
          {
            role: 'student',
            isFunded: false,
            data: {
              minimum_trading_days: '3',
              trading_period: 'Unlimited',
              maximum_daily_loss: '-',
              maximum_overall_loss: '$2000',
              profit_target: '$2500',
              consistency: '40%',
              max_contracts: '4',
              reward_cap: '$5000',
            },
          },
          {
            role: 'master',
            isFunded: true,
            data: {
              trading_period: 'Unlimited',
              maximum_daily_loss: '-',
              maximum_overall_loss: '$2000',
              payouts_profit_split: 'Every 5 trading days at 90% split',
              max_contracts: '4',
              activation_fee: '-',
              reward_cap: '-',
            },
          },
        ],
      },
      zero: {
        price: 1,
        total_cost: 499,
        recurring: false,
        discount: 35,
        roles: [
          {
            role: 'master',
            isFunded: true,
            data: {
              trading_period: 'Unlimited',
              minimum_trading_days: '-',
              maximum_daily_loss: '-',
              maximum_overall_loss: '$2000',
              consistency: '25%',
              max_contracts: '3',
              reward_cap: '-',
              payouts_profit_split: 'Every 7 trading days at 90% split',
            },
          },
        ],
      },
      one_day_pass: {
        price: 177,
        total_cost: 177,
        recurring: true,
        discount: 0,
        roles: [
          {
            role: 'student',
            isFunded: false,
            data: {
              minimum_trading_days: '-',
              trading_period: '1 Day',
              maximum_daily_loss: '$1000',
              maximum_overall_loss: '$1500',
              profit_target: '$4000',
              consistency: '-',
              max_contracts: '3 Mini or 15 Micros',
              reward_cap: '-',
              activation_fee: '-',
            },
          },
          {
            role: 'master',
            isFunded: true,
            data: {
              trading_period: 'Unlimited',
              maximum_daily_loss: '$1000',
              maximum_overall_loss: '$1500',
              payouts_profit_split: 'Every 7 calendar days at 90% split',
              max_contracts: '3 Mini or 15 Micros',
              activation_fee: '-',
              reward_cap: '-',
            },
          },
        ],
      },
    },
  },
  '100000': {
    steps: {
      one_step_pro_plus: {
        price: 1,
        total_cost: 199,
        recurring: true,
        discount: 35,
        roles: [
          {
            role: 'student',
            isFunded: false,
            data: {
              minimum_trading_days: '3',
              trading_period: 'Unlimited',
              maximum_daily_loss: '-',
              maximum_overall_loss: '$3000',
              profit_target: '$6000',
              consistency: '40%',
              max_contracts: '8',
              reward_cap: '$5000',
            },
          },
          {
            role: 'master',
            isFunded: true,
            data: {
              trading_period: 'Unlimited',
              maximum_daily_loss: '-',
              maximum_overall_loss: '$3000',
              payouts_profit_split: 'Every 5 trading days at 90% split',
              max_contracts: '8',
              activation_fee: '-',
              reward_cap: '-',
            },
          },
        ],
      },
      zero: {
        price: 1,
        total_cost: 599,
        recurring: false,
        discount: 35,
        roles: [
          {
            role: 'master',
            isFunded: true,
            data: {
              trading_period: 'Unlimited',
              minimum_trading_days: '-',
              maximum_daily_loss: '-',
              maximum_overall_loss: '$3000',
              consistency: '25%',
              max_contracts: '5',
              reward_cap: '-',
              payouts_profit_split: 'Every 7 trading days at 90% split',
            },
          },
        ],
      },
    },
  },
}