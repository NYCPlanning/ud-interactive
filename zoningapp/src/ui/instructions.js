import React from 'react'
import { useStore } from '../state'

export default ({ text }) => {
  const showInstructions = useStore(state => state.showInstructions)
  
  if (!showInstructions) return null
  else return (
    <div className='w-full instruction-card'>
      <p>{text}</p>
    </div>
  )
}
