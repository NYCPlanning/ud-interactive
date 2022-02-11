import React, { useState } from 'react'
import { useSnapshot } from 'valtio'
import { state, inc, toggleDrawer } from '../services/state'

import InstructionsToggle from './instructiontoggle'
import ProblemReport from './problemreport'
import Status from './clientstatus'
import VersionInfo from './versioninfo'
// import Points from './realtimecontrols'


const ModePicker = () => {
  const modes = ['Context', 'Setup', 'Build', 'Measure', 'Summary']
  const [ modeIndex, setModeIndex ] = useState(0)

  const inc = () => {
    if ( modeIndex + 1 < modes.length ) setModeIndex(modeIndex + 1)
    else setModeIndex(0)
  }

  return (
    <div>
      <button>←</button>
      {modes[modeIndex]}
      <button onClick={inc}>→</button>
    </div>
  )
}

const GuideLink = () => (
  <div className='flex space-x-4'>
    <a target='_blank'
      rel='noopener noreferrer' 
      href={process.env.REACT_APP_DOCS_URL}
    >
      Guide ↗
    </a>
    {/* <ToggleInstructions /> */}
  </div>
)


const Controls = () => {
  const scenario = {id: 'A', buildYear: 1999}
  const site = {id: '1', bbls: ['2025540049']}
  const zoningLot = {
    id: 'zl1',
    site: site,
    scenario: scenario,
    zone: 'R6A',
  }

  const snap = useSnapshot(state)
  const width = snap.drawer ? '1/2' : '2'
  
  return (
    <div className={`w-${width} bg-red-200`}>
      <h1>UDTools</h1>
      
      <div>
        <h2>Site</h2>
        <p>ID: {site.id}</p>
        <p>Lots: {site.bbls}</p>
      </div>
      
      <div>
        <h2>Scenario</h2>
        <p>ID: {scenario.id}</p>
        <p>Build Year: {scenario.buildYear}</p>
      </div>

      <div>
        <h2>Zoning Lot</h2>
        <p>ID: {zoningLot.id}</p>
        <p>Zone: {zoningLot.zone}</p>
      </div>

      <button>Generate Envelope</button>
      <button>Download Model</button>

      <p>{snap.count}</p>
      <button onClick={inc}>increment</button>
      {/* <Points /> */}

      <button onClick={toggleDrawer}>TOGGLE</button>

      <div>
        Connected to Desktop Client:
        <Status />
        Connected to Server:
        [ geometry ] [ realtime annotations ] 
      </div>
      <InstructionsToggle />
      <ModePicker />
      <GuideLink />
      <ProblemReport />
      <VersionInfo />
    </div>
  )
}


export default Controls