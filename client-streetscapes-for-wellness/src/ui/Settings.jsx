import React, { useState } from 'react'
import { useSnapshot } from 'valtio'

import { state } from '../state'


const SettingsList = () => {
  const {
    dematerialize,
    showAnnotations,
    showDebugger,
    showCaptions,
  } = useSnapshot(state)

  const toggleAnnotations = () => state.showAnnotations = !showAnnotations
  const toggleCaptions = () => state.showCaptions = !showCaptions
  const toggleDebugger = () => state.showDebugger = !showDebugger
  const toggleDemat = () => state.dematerialize = !dematerialize  

  return (
    <>
      <label>
        Show Annotations
        <input
          className='ml-2'
          type='checkbox'
          checked={showAnnotations}
          onChange={toggleAnnotations}
        />
      </label>
      <label>
        Captions
        <input
          className='ml-2'
          type='checkbox'
          checked={showCaptions}
          onChange={toggleCaptions}
        />
      </label>
      <label>
        Debugger
        <input
          className='ml-2'
          type='checkbox'
          checked={showDebugger}
          onChange={toggleDebugger}
        />
      </label>
      <label>
        Dematerialize
        <input
          className='ml-2'
          type='checkbox'
          checked={dematerialize}
          onChange={toggleDemat}
        />
      </label>
    </>
  )
}


const SettingsWrapper = () => {
  const [ show, setShow ] = useState(false)

  const toggleShow = () => setShow(!show)
  
  const showLabel = show ? 'Hide ' : ''

  return (
    <div className='fixed bottom-0 right-0 m-2 flex flex-col items-end bg-white p-1'>
      { show && <SettingsList /> }
      <button onClick={toggleShow}>{showLabel}Options</button>
    </div>
  )
}


export default SettingsWrapper
