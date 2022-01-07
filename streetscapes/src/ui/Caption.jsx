import React from 'react'
import { useSnapshot } from 'valtio'

import { state } from '../state'

const Caption = () => {
  const { index, cameras } = useSnapshot(state)
  const { userData: { caption }} = cameras[index]
  
  return (
    <div className='caption p-1'>
      <span>{caption}</span>
    </div>
  )
}

export default Caption
