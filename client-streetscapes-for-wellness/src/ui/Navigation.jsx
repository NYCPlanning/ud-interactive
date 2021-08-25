import React from 'react'
import { useSnapshot } from 'valtio'

import { nextPos, previousPos, state, getCurrentSceneName } from '../state'
import Caption from './Caption'
import Debugger from './Debugger'
import Settings from './Settings'


const Navigation = () => {
  const {
    showDebugger,
    showCaptions,
  } = useSnapshot(state)

  const sceneName = 'Scene Name'

  return (
    <div id='nav-root' className='fixed bottom-0 left-0 m-2'>
      {/* <span className='info-icon'>i</span> */}
      { showCaptions && <Caption /> }
      <div className='bg-white p-2 flex justify-between space-x-4'>
        <button onClick={previousPos}>Prev</button>
        <span className='text-gray-500'>{sceneName}</span>
        <button onClick={nextPos}>Next</button>
        {/* optional - lookaround arrows ←→↑↓*/}
        <span className='font-bold'>Streetscapes for Wellness</span>
      </div>
      <Settings />
      { showDebugger && <Debugger /> }
    </div>
  )
}


export default Navigation
