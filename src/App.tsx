import React, { useState } from 'react'
import { TableInfo } from './TableInfo'
import { StagesBanner } from './StagesBanner'
import { pricingTableData, modelsMap, stepsMap } from './pricingData'
import { Models, AccountSize } from '../types'

function App() {
  const [selectedModel, setSelectedModel] = useState<Models>('fundingticks_pro')
  const [selectedAccountSize, setSelectedAccountSize] = useState<AccountSize>('25000')

  const stepKey = stepsMap[selectedModel]?.[0]?.key || ''

  const stepData = pricingTableData[selectedAccountSize]?.steps[stepKey as keyof typeof pricingTableData[typeof selectedAccountSize]['steps']]
  const roles = stepData?.roles || []

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Pricing Table</h1>

      <div style={{ marginBottom: '30px', display: "flex", padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>

        <div>
          <h2>Controls</h2>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Select Model:
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as Models)}
            style={{ padding: '8px', fontSize: '14px', minWidth: '200px' }}
          >
            {Object.entries(modelsMap).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Select Account Size:
          </label>
          <select
            value={selectedAccountSize}
            onChange={(e) => setSelectedAccountSize(e.target.value as AccountSize)}
            style={{ padding: '8px', fontSize: '14px', minWidth: '200px' }}
          >
            <option value="25000">$25,000</option>
            <option value="50000">$50,000</option>
            <option value="100000">$100,000</option>
          </select>
        </div>
        </div>

        <div style={{ padding: '10px', background: '#fff', borderRadius: '4px', marginTop: '10px' }}>
          <strong>Current Selection:</strong>
          <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li>Model: {modelsMap[selectedModel]}</li>
            <li>Account Size: ${parseInt(selectedAccountSize).toLocaleString()}</li>
            <li>Step Key: {stepKey}</li>
            <li>Price: ${stepData?.total_cost || 0}</li>
            <li>Recurring: {stepData?.recurring ? 'Yes' : 'No'}</li>
            <li>Stages: {roles.length}</li>
          </ul>
        </div>
      </div>

      {stepData && roles.length > 0 ? (
        <>
          <div style={{ marginBottom: '30px' }}>
            <h2>Table Info Component</h2>
            <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', overflowX: 'auto' }}>
              <TableInfo
                roles={roles}
                model={selectedModel}
                modelsMap={modelsMap}
                stepKey={stepKey}
                accountSize={selectedAccountSize}
              />
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h2>Stages Banner Component</h2>
            <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <StagesBanner
                  roles={roles}
                  model={selectedModel}
                  stepKey={stepKey}
              />
            </div>
          </div>
        </>
      ) : (
        <div style={{ padding: '20px', background: 'tomato', borderRadius: '8px' }}>
          <strong>No match for this data</strong>
        </div>
      )}
    </div>
  )
}

export default App
