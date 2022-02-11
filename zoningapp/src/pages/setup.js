import React from 'react'
import { useStore } from '../state'
// import AddSite from '../components/addsite';
// import AddScenario from '../components/buttons/addscenario'
import Instructions from '../components/instructions'
import Table from '../components/table'

const instructions = `Optionally, run UDImportZoning to define custom zones. \
Then run UDAddScenario, UDAddSite, and/or UDImportSites to define sites \
and scenarios. If you have a site model in Rhino already \
but see a tax lot count of 0, check the instructions on the Context tab.`

export default () => {
  const allLots = useStore(state => state.allLots)
  const allScenarios = useStore(state => state.allScenarios)
  const allSites = useStore(state => state.allSites)
  const allZones = useStore(state => state.allZones)

  const lots = { 'Count': allLots.length }
  const scenarioIds = allScenarios.map((s) => s.ID)
  const siteIds = allSites.map((s) => s.ID)
  const zoneIds = allZones.map((z) => z.ID)

  return (
    <>
      <Instructions text={instructions} />
      <Table label='Tax Lots' dict={lots} />
      <Table label='Scenarios' list={scenarioIds} />
      <Table label='Sites' list={siteIds} />
      <Table label='Custom Zones' list={zoneIds} />
      {/* <AddScenario /> */}
      {/* <AddSite /> */}
    </>
  )
};
