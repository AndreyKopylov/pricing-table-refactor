// Legacy type definitions for the pricing table
// DO NOT MODIFY - These types must remain compatible with the existing system

export type AccountSize = '25000' | '50000' | '100000'

export type Models = 
  | 'fundingticks_pro' 
  | 'fundingticks_zero' 
  | 'fundingticks_one_day_pass'

export type StepKey = 
  | 'one_step_pro_plus' 
  | 'zero' 
  | 'one_day_pass'

export interface RoleData {
  minimum_trading_days?: string
  trading_period?: string
  maximum_daily_loss?: string
  maximum_overall_loss?: string
  reward_cap?: string
  profit_target?: string
  consistency?: string
  max_contracts?: string
  payouts_profit_split?: string
  activation_fee?: string
  leverage?: string
  account_fee?: string
}

export interface RoleItem {
  role: 'student' | 'master'
  isFunded: boolean
  data: RoleData
}

export interface Step {
  price: number
  total_cost: number
  recurring: boolean
  discount: number
  roles: RoleItem[]
}

export interface AccountSteps {
  one_step_pro_plus?: Step
  zero?: Step
  one_day_pass?: Step
}

export interface TradingData {
  [accountSize: string]: {
    steps: AccountSteps
  }
}

export type ModelsMap = {
  [key in Models]?: string
}

export type StepsMap = {
  [key in Models]?: Array<{ key: string; name: string }>
}