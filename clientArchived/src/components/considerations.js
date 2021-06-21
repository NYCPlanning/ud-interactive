import React from 'react'
import { Remarkable } from 'remarkable'

const md = `
The following should always be considered when planning or evaluating a development that includes multi-family residential buildings:

## Building Safety

- All residential units have legally required windows that must face a street, required yard or court
- Buildings must have adequate egress routes that lead one directly out of the building to the public R.O.W.

## Quality of Indoor Environment

- Consider the lot orientation to maximize natural light and air circulation in living areas
- Assume a floor-to-floor height of 10 feet to meet requirements and leave room for mechanicals

## Interface with Surroundings

- Study the architectural context and determine if there are landmarks regulations that impact building heights or setbacks
- If the ground floor is being occupied with residential units, consider elevating slightly above sidewalk level for comfort and privacy
- If the ground floor is being occupied with residential amenities, consider where they are placed in relation to the sidewalk
- When parking is required or proposed, consider placing the entry/exit where it would least interrupt pedestrian flow

## Effect on Construction Costs
- The lot depth dictates whether one can build a single- or double- loaded corridor, or point tower
- The lot dimensions dictate how to organize a building floorplan in the most efficient manner
- In taller buildings, consider the best placement for the vertical circulation core

## Environmental Impact

- Consider the lot orientation to plan for energy efficiency
`

const parser = new Remarkable({html: true});

export default function Considerations({ sceneKeys, index }) {
  let doc = ''

  if (index === 0) doc = parser.render(md)

  else {
    const mdProcessed = md.replace(sceneKeys[index], (match) => (`<span class='highlight'>${match}</span>`))
    doc = parser.render(mdProcessed)
  }

  return(
    <div 
      className=''
      dangerouslySetInnerHTML={{__html:doc}}
    >
    </div>
  )
}
