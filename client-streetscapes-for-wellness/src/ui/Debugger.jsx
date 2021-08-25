import React from 'react'
import { useSnapshot } from 'valtio'

import { state } from '../state'


const StateDebugger = () => {
  const { 
    cameras, 
    index,
    dematerialize,
    showAnnotations,
    sunPosition,
  } = useSnapshot(state)

  return (
    <div className='debug fixed top-0 left-0'>
      <div>on view: {index + 1}/{cameras.length}</div>
      <div>dematerialize: {String(dematerialize)}</div>
      <div>annotations: {String(showAnnotations)}</div>
      <div>sun: {String(sunPosition)}</div>
    </div>
  )
}


export default StateDebugger
