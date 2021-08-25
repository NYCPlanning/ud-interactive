import React from 'react'
import { useSnapshot } from 'valtio'

import { nextPos, previousPos, state } from '../state'
import Caption from './Caption'
import Debugger from './Debugger'
import Settings from './Settings'


const Navigation = () => {
  return (
    <div id='nav-root' className=' bg-white'>
      <div>
        <Caption />
      </div>
      <div>
        <button onClick={previousPos}>Prev</button>
        <button>Residential View</button>
        <button onClick={nextPos}>Next</button>
        {/* optional - lookaround arrows ←→↑↓*/}
        <span className='title'>Streetscapes for Wellness</span>
        <span className='info-icon'>i</span>
      </div>
      <Settings />
      {/* <Debugger /> */}
    </div>
  )
}


export default Navigation
