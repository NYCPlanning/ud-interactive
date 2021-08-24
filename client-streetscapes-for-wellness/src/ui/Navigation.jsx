import React, { useState } from 'react'
import { useSnapshot } from 'valtio'

import { nextPos, previousPos, state } from '../state'
import Caption from './Caption'


const StateDebugger = () => {
  const { cameras, index } = useSnapshot(state);

  return (
    <div>
      <div>PLACEHOLDER: </div>
      <div>{cameras.length} cameras loaded</div>
      <div>on {index}</div>
    </div>
  )
}


const Settings = () => {
  const { cameras, index, dematerialize, showAnnotations } = useSnapshot(state)
  const [ i, setI ] = useState(0)
  // const [ demat, setDemat ] = useState(false)

  const toggleAnnotations = () => {
    state.showAnnotations = !showAnnotations
  }

  const sunPositions = [
    [45, 100, -45],
    [65, 100, 45],
  ]

  const toggleSunPosition = () => {
    if ( i + 1 > sunPositions.length - 1) setI(0)
    else setI( i + 1 )
    state.sunPosition = sunPositions[i]
  }

  const toggleDemat = () => {
    state.dematerialize = !dematerialize
  }

  return (
    <>
      <button onClick={toggleSunPosition}>Change Sun</button>
      <button onClick={toggleDemat}>Dematerialize</button>
      <button onClick={toggleAnnotations}>Show Annotations</button>
    </>
  )
}


const AltNavigation = () => {
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
      <div>
        <Settings />
      </div>
    </div>
  )
}

export default AltNavigation
