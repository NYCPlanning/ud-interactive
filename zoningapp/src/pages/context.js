import React from 'react'
import MapPanel from '../components/mappanel'
import Instructions from '../components/instructions'

const contextInstructions = `Click points on the map \
  to define a study area boundary, \
  then run UDImportModel to import. \
  If you already have a site model in Rhino \
  with tax lots and buildings, \
  run UDRestoreModel.`

export default () => (
  <>
    <Instructions text={contextInstructions} />
    <MapPanel />
    {/* <ImportModelControls /> */}
  </>
)
