import React, { useRef } from 'react'
import { useSnapshot } from 'valtio'

import state, { getISODateTime } from './state'

const Controls = () => {
  const snap = useSnapshot(state)
  const timeRef = useRef(null)

  const handleDateChange = ({ target: { value }}) => {
    state.frame.date = value
  }

  const handleTimeChange = ({ target: { value }}) => {
    state.frame.time = value
  }

  const incrementTime = (i) => {
    if ( i === 1 ) timeRef.current.stepUp(60)
    else if ( i === -1) timeRef.current.stepDown(60)
    state.frame.time = timeRef.current.value
  }

  const pickDate = (d) => {
    state.frame.date = d
  }
  
  return (
    <div id='controls-root'>
      <input 
        type="date" 
        id="start" 
        name="trip-start"
        value={snap.frame.date}
        onChange={handleDateChange}
      />
      <input 
        type="time"
        ref={timeRef}
        value={snap.frame.time}
        onChange={handleTimeChange}
      />
      <div>
        <button onClick={() => incrementTime(-1)}>-1 hr</button>
        <button onClick={() => incrementTime(1)}>+1 hr</button>
      </div>
      <div>
        <button onClick={() => pickDate('2021-03-20')}>Spring Equinox</button>
        <button onClick={() => pickDate('2021-06-21')}>Summer Solstice</button>
        <button onClick={() => pickDate('2021-09-22')}>Fall Equinox</button>
        <button onClick={() => pickDate('2021-12-21')}>Winter Solstice</button>
      </div>
      <div>
        <code>Location: New York, NY</code>
      </div>
      <div>
        <code>Estimated Solar Radiation: {snap.radiation} watts/m²</code>
      </div>
      <div>
        <code>Server version: {snap.serverVersion}</code>
      </div>
    </div>
  )
}

export default Controls
