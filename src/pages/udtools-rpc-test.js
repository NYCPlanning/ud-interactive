import React from 'react'
// import wkx from 'wkx'
// import { Buffer } from 'buffer'
// import { client, TaxLot, Site } from '../sources/udtools'
import Blank from '../layouts/blank'

export default () => {
  // create a TaxLot object for the request
  // var request = new TaxLot({bbl: '1001230002'})

  // make a remote procedure call to get a Site object
  // client.makeSite(request, {}, (err, response) => {
  //   console.log(response.getId())
  //   console.log(response)
  //   const geomWkb = new Buffer.from(response.getGeom())
  //   const geom = wkx.Geometry.parse(geomWkb)
  //   console.log(geom)
  // })

  return (
    <Blank>
      OPEN CONSOLE
    </Blank>
  )
}
