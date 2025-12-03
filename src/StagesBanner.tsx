// LEGACY CODE - Component that displays pricing stages
// Notice the hardcoded logic and special cases

import React, { FC, useMemo } from 'react'
import { RoleItem } from '../types'

type StagesBannerProps = {
  roles: RoleItem[]
  model: string
  stepKey: string
}

export const StagesBanner: FC<StagesBannerProps> = ({ roles, model, stepKey }) => {
  const stages = {
    evaluation: roles.filter((r) => r.role !== 'master'),
    master: roles.filter((r) => r.role === 'master'),
  }
  
  // Notice all the hardcoded special cases
  const payoutsCycle = useMemo(() => {
    // Special case for fundingticks_zero
    if (stepKey === 'zero' && model === 'fundingticks_zero') {
      const zeroPayouts = roles
        .filter(({ data }) => 'payouts_profit_split' in data && data.payouts_profit_split)
        .map(({ data }) => (data as any).payouts_profit_split)
      return [...new Set(zeroPayouts)]
    }

    // Default case
    const payouts = roles
      .filter(({ data }) => 'payouts_profit_split' in data && data.payouts_profit_split)
      .map(({ data }) => (data as any).payouts_profit_split)

    return [...new Set(payouts)]
  }, [roles, model, stepKey])

  return (
    <div className='banner'>
      <div className='stages'>
        {stages.evaluation.length > 0 && (
          <div className='stage'>
            <p className='title'>Evaluation Stage</p>
            <p className='subtitle'>
              ({stages.evaluation.map((stage) => stage.role).join(' & ')})
            </p>
          </div>
        )}

        {stages.master.length > 0 && (
          <div className='stage'>
            <p className='title'>Master Stage</p>
            <p className='subtitle'>(Master)</p>
          </div>
        )}
      </div>
      
      {payoutsCycle.length > 0 && (
        <div className='payouts'>
          <p className='label'>Reward Cycles</p>
          <div className='cycles'>
            {payoutsCycle.map((payout) => (
              <div key={payout} className='cycle'>
                <span className='check'>✓</span>
                <span className='text'>{payout}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}