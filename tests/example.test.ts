// Example test cases to validate your refactored solution
// Your solution should pass these tests while improving the code structure
// NOTE: Jest types are not installed - candidates should focus on the refactoring, not test setup

import { TradingData, ModelsMap, StepsMap } from '../types'

describe('Pricing Table Refactor', () => {
  let pricingData: TradingData
  let modelsMap: ModelsMap
  let stepsMap: StepsMap

  beforeEach(() => {
    // Your refactored solution should provide these
    // pricingData = yourSolution.getPricingData()
    // modelsMap = yourSolution.getModelsMap()
    // stepsMap = yourSolution.getStepsMap()
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
      // 4% overall loss for $25,000 = $1,000
      const pro25k = pricingData['25000'].steps.one_step_pro_plus
      expect(pro25k?.roles[0].data.maximum_overall_loss).toBe('$1000')
      
      // 4% overall loss for $50,000 = $2,000
      const pro50k = pricingData['50000'].steps.one_step_pro_plus
      expect(pro50k?.roles[0].data.maximum_overall_loss).toBe('$2000')
    })
  })

  describe('Adding New Models', () => {
    test('should be easy to add a new model', () => {
      // Your solution should make this much simpler than the current approach
      // For example, it might look something like:
      
      // const eliteModel = yourSolution.createModel({
      //   id: 'fundingticks_elite',
      //   name: 'FundingTicks Elite',
      //   basePrice: 149,
      //   profitTargetPercent: 8,
      //   // ... other config
      // })
      
      // Verify the model was added correctly
      // expect(modelsMap.fundingticks_elite).toBe('FundingTicks Elite')
    })
  })

  describe('Type Safety', () => {
    test('should not require unsafe type casting', () => {
      // Your solution should provide type-safe access to data
      // without needing `as any` casts
      
      const roleData = pricingData['25000'].steps.one_step_pro_plus?.roles[0].data
      
      // Should be able to access fields safely
      expect(roleData?.profit_target).toBeDefined()
      expect(roleData?.maximum_overall_loss).toBeDefined()
    })
  })

  describe('Scalability', () => {
    test('should scale calculations based on account size', () => {
      // Verify that calculations scale properly
      
      // Max contracts should scale with account size
      const contracts25k = pricingData['25000'].steps.one_step_pro_plus?.roles[0].data.max_contracts
      const contracts50k = pricingData['50000'].steps.one_step_pro_plus?.roles[0].data.max_contracts
      const contracts100k = pricingData['100000'].steps.one_step_pro_plus?.roles[0].data.max_contracts
      
      expect(parseInt(contracts25k || '0')).toBe(2)
      expect(parseInt(contracts50k || '0')).toBe(4)
      expect(parseInt(contracts100k || '0')).toBe(8)
    })
  })
})

// Example integration test
describe('Component Integration', () => {
  test('TableInfo should work with refactored data', () => {
    // Your refactored components should still work with the data
    
    // const roles = pricingData['25000'].steps.one_step_pro_plus?.roles || []
    // const component = render(
    //   <TableInfo 
    //     roles={roles}
    //     model="fundingticks_pro"
    //     modelsMap={modelsMap}
    //     stepKey="one_step_pro_plus"
    //     accountSize="25000"
    //   />
    // )
    
    // Verify rendering works correctly
  })
})