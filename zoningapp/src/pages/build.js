import React from 'react'
import { useStore } from '../state'
import Instructions from '../components/instructions'
import MassingGoals from '../components/forms/massinggoals'
//import SiteUtilization from '../components/graphic/siteutilization'
import Table from '../components/table'
import ToggleSubject from '../components/forms/togglesubject'

const instructions = `Toggle sites/scenarios using the drop-downs above. \
  To create massings and envelopes, first set massing goals, \
  then run UDGenerateEnvelope and UDGenerateMassing.`

export default () => {
  const currentSite = useStore(state => state.currentSite)
  const si = useStore(state => state.currentScenarioIndex)
  
  let zone, details = {}
  if (currentSite.Scenarios){
    const { LotIDs, Note, Group, Scenarios } = currentSite
    zone = Object.entries(Scenarios)[si][1]
    details = {
      'Tax Lots': LotIDs.join(', '),
      'Group': Group,
      'Notes': Note,
    }
  }

  return (
    <>
      <ToggleSubject />
      <Instructions text={instructions} />
      {/* <SiteUtilization /> */}
      <MassingGoals />
      <Table label='Zoning Rules' dict={zone} />
      <Table label='Site Details' dict={details} />
    </>
  );
};
