// LEGACY CODE - Component that displays pricing table information
// Notice the complex conditional rendering and hardcoded field mappings

import React, { FC, useMemo } from 'react'
import { Models, RoleItem, AccountSize } from '../types'

// Unsafe type access helper
const getRoleDataValue = (data: RoleItem['data'], key: string): string | number | undefined => {
  return (data as any)[key]
}

export type TableInfoProps = {
  roles: RoleItem[]
  model: Models
  modelsMap: { [key in Models]?: string }
  stepKey: string
  accountSize: AccountSize
}

export type ParameterRow = {
  title: string
  key: string
  show: (role: RoleItem) => boolean
  renderCustom?: (role: RoleItem) => React.ReactNode
}

export const TableInfo: FC<TableInfoProps> = ({
  roles,
  model,
  modelsMap,
  stepKey,
  accountSize,
}) => {
  // Hardcoded title mappings
  const maxLossMap: Record<string, string> = {
    fundingticks_zero: 'Max. EOD Trailing Loss',
    fundingticks_standard: 'Max. EOD Trailing Loss',
    fundingticks_pro: 'Max. EOD Trailing Loss',
    fundingticks_one_day_pass: 'Max. EOD Trailing Loss',
  }

  const maxLossTitle = maxLossMap[model] || 'Maximum Loss'

  // Complex parameter configuration with many special cases
  const parameterRows: ParameterRow[] = useMemo(
    () => [
      {
        title: 'Profit Target',
        key: 'profit_target',
        show: (role: RoleItem) => {
          // Special case for fundingticks_zero
          if (model === 'fundingticks_zero' && role.role === 'master') {
            return false
          }
          return Boolean(role.role)
        },
      },
      {
        title: maxLossTitle,
        key: 'maximum_overall_loss',
        show: () => true,
      },
      {
        title: 'Maximum Daily Loss',
        key: 'maximum_daily_loss',
        show: () => true,
      },
      {
        title: 'Minimum Trading Days',
        key: 'minimum_trading_days',
        show: (role: RoleItem) =>
          role.role !== 'master' && 
          'minimum_trading_days' in role.data &&
          model !== 'fundingticks_one_day_pass',
      },
      {
        title: 'Consistency Evaluation',
        key: 'consistency',
        show: (role: RoleItem) =>
          model !== 'fundingticks_pro' &&
          role.role !== 'master' &&
          'consistency' in role.data &&
          !!role.data.consistency,
      },
      {
        title: 'Consistency',
        key: 'consistency',
        show: (role: RoleItem) => 
          model === 'fundingticks_pro' && 
          role.role !== 'master' && 
          'consistency' in role.data,
      },
      {
        title: 'Consistency on Rewards',
        key: 'consistency',
        show: (role: RoleItem) => 
          role.role === 'master' && 
          'consistency' in role.data && 
          !!role.data.consistency,
      },
      {
        title: 'Leverage',
        key: 'leverage',
        show: (role: RoleItem) => 
          'leverage' in role.data && 
          role.data.leverage !== undefined,
      },
      {
        title: 'Rewards & Split',
        key: 'payouts_profit_split',
        show: (role: RoleItem) => 
          role.role === 'master' && 
          'payouts_profit_split' in role.data,
      },
      {
        title: 'Contracts',
        key: 'max_contracts',
        show: (role: RoleItem) =>
          // More hardcoded model checks
          ('fundingticks_standard' in modelsMap ||
            'fundingticks_static' in modelsMap ||
            'fundingticks_zero' in modelsMap ||
            'fundingticks_one_day_pass' in modelsMap) &&
          'max_contracts' in role.data,
      },
      {
        title: 'Account Fee',
        key: 'account_fee',
        show: (role: RoleItem) => 
          'account_fee' in role.data && 
          (role.role === 'master' || role.role === 'student'),
      },
      {
        title: 'Activation Fee',
        key: 'activation_fee',
        show: (role: RoleItem) => 
          role.role === 'master' && 
          'activation_fee' in role.data,
      },
      {
        title: 'Reward Cap',
        key: 'reward_cap',
        show: (role: RoleItem) => 
          role.role === 'master' && 
          model === 'fundingticks_zero',
        renderCustom: (role) => {
          const isFTZero = role.role === 'master' && model === 'fundingticks_zero'
          return isFTZero ? <span>Dynamic</span> : null
        },
      },
    ],
    [maxLossTitle, model, stepKey, modelsMap],
  )

  const filterParameterRows = useMemo(
    () => parameterRows.filter(({ show }) => roles.some((role) => show(role))),
    [parameterRows, roles],
  )

  return (
    <div className='table-info'>
      <table className='pricing-table'>
        <thead>
          <tr>
            <th></th>
            {roles.map(({ role }, i) => (
              <th key={role}>
                <div className='stage-number'>{i + 1}</div>
                <div className='stage-name'>{role}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterParameterRows.map((row) => (
            <tr key={row.key}>
              <td className='parameter-title'>{row.title}</td>
              {roles.map((roleItem) => {
                const value = getRoleDataValue(roleItem.data, row.key)
                return (
                  <td key={`${roleItem.role}-${row.key}`}>
                    {row.show(roleItem) 
                      ? (row.renderCustom?.(roleItem) ?? value ?? '-') 
                      : '-'}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}