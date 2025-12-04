// Example test cases to validate your refactored solution
// Your solution should pass these tests while improving the code structure
// NOTE: Jest types are not installed - candidates should focus on the refactoring, not test setup

import { TradingData, ModelsMap, StepsMap } from '../types'
import { pricingTableData, modelsMap, stepsMap } from '../src/generators/pricingData'

describe('Pricing Table Refactor', () => {
  let pricingData: TradingData

  beforeEach(() => {
    pricingData = pricingTableData
  })

  describe('Data Structure', () => {
    test('should maintain compatibility with TradingData type', () => {
      expect(pricingData).toBeDefined()
      expect(pricingData['25000']).toBeDefined()
      expect(pricingData['25000'].steps).toBeDefined()
    })

    test('should include all required models', () => {
      expect(modelsMap.fundingticks_pro).toBe('FundingTicks Pro')
      expect(modelsMap.fundingticks_zero).toBe('FundingTicks Zero')
      expect(modelsMap.fundingticks_one_day_pass).toBe('One Day Pass')
    })

    test('should have consistent loss calculations', () => {
      const pro25k = pricingData['25000'].steps.one_step_pro_plus
      expect(pro25k?.roles[0].data.maximum_overall_loss).toBe('$1000')

      const pro50k = pricingData['50000'].steps.one_step_pro_plus
      expect(pro50k?.roles[0].data.maximum_overall_loss).toBe('$2000')
    })
  })

  describe('Adding New Models', () => {
    test('should be easy to add a new model', () => {
      expect(modelsMap.fundingticks_pro).toBe('FundingTicks Pro')
      expect(stepsMap.fundingticks_pro).toBeDefined()
    })
  })

  describe('Type Safety', () => {
    test('should not require unsafe type casting', () => {
      const roleData = pricingData['25000'].steps.one_step_pro_plus?.roles[0].data

      expect(roleData?.profit_target).toBeDefined()
      expect(roleData?.maximum_overall_loss).toBeDefined()
    })
  })

  describe('Scalability', () => {
    test('should scale calculations based on account size', () => {
      const contracts25k = pricingData['25000'].steps.one_step_pro_plus?.roles[0].data.max_contracts
      const contracts50k = pricingData['50000'].steps.one_step_pro_plus?.roles[0].data.max_contracts
      const contracts100k = pricingData['100000'].steps.one_step_pro_plus?.roles[0].data.max_contracts

      expect(parseInt(contracts25k || '0')).toBe(2)
      expect(parseInt(contracts50k || '0')).toBe(4)
      expect(parseInt(contracts100k || '0')).toBe(8)
    })
  })
})

describe('Component Integration', () => {
  test('TableInfo should work with refactored data', () => {
    const roles = pricingTableData['25000'].steps.one_step_pro_plus?.roles || []
    expect(roles.length).toBeGreaterThan(0)
    expect(roles[0].role).toBe('student')
    expect(roles[0].data.profit_target).toBeDefined()
  })
})