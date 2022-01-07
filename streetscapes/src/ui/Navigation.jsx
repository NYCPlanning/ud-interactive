import React from 'react'
import { useSnapshot } from 'valtio'

import { nextPos, previousPos, state } from '../state'
import Caption from './Caption'
import Debugger from './Debugger'
import Settings from './Settings'
// import LookAroundControls from './LookAroundControls'


const Navigation = () => {
  const {
    title,
    currentViewName: viewName,
    showDebugger,
    showCaptions,
  } = useSnapshot(state)

  return (
    <div id='nav-root' className='fixed bottom-0 left-0 m-2'>
      <div className='flex flex-col items-start'>
        { showCaptions && <Caption /> }
        <div className='bg-white p-2 flex justify-between space-x-4'>
          <button onClick={previousPos}>Prev</button>
          <span className='text-gray-500'>{viewName}</span>
          <button onClick={nextPos}>Next</button>
          <span className='font-bold'>{title}</span>
        </div>
      </div>
      <Settings />
      { showDebugger && <Debugger /> }
      {/* <LookAroundControls /> */}
    </div>
  )
}

export default Navigation
