import React, { useEffect } from 'react'
import { useStore } from '../state'
import ToggleSubject from '../components/forms/togglesubject'
import DownloadExcel from '../components/buttons/downloadexcel'
import Instructions from '../components/instructions'
import Table from '../components/table'
import { formatNum } from '../utils/format'

const instructions = `To export a complete \
  summary table for Excel, press Calculate, \
  then Download Excel.`

export default () => {
  // const allSites = useStore(state => state.allSites)

  // const sites = {
  //   head: ['ID', 'R', 'CF', 'C', 'M', 'Total', 'Units'],
  //   body: allSites.map((s) => {
  //     const {
  //       ID,
  //       ZFA: {
  //         Residential: R,
  //         CommunityFacility: CF,
  //         Commercial: C,
  //         Manufacturing: M,
  //         Total: T,
  //       },
  //       Counts: {
  //         ResidentialUnits: U,
  //       }
  //     } = s

  //     return [
  //       ID, 
  //       formatNum(R), 
  //       formatNum(CF), 
  //       formatNum(C), 
  //       formatNum(M), 
  //       formatNum(T), 
  //       U
  //     ]
  //   })
  // }
  // console.log(sites)

  return (
    <>
      <ToggleSubject disable={['site']} />
      <Instructions text={instructions} />
      {/* <Table table={sites} /> */}
      <DownloadExcel />
    </>
  )
}
