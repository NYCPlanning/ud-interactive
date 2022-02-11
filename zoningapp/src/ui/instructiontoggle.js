import React from 'react'
import { useSnapshot } from 'valtio'
import { state, toggleInstructions } from '../services/state'

const InstructionsToggle = () => {
  const snap = useSnapshot(state)
  const showInstructions = snap.showInstructions

  return (
    <span>
      <label htmlFor='instructions'>Show Instructions</label>
      <input
        id='instructions'
        className='ml-2'
        type='checkbox'
        checked={showInstructions}
        onChange={toggleInstructions}
      />
    </span>
  )
}

export default InstructionsToggle