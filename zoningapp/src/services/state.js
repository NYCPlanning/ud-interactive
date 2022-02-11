import { proxy } from 'valtio'

export const state = proxy({
  count: 0,
  channel: 'default',
  clientConnected: false,
  clientId: '',
  drawer: true,
  showInstructions: false,
  envelope: null,
  ground: null,
  groundTexture: null,
  existingBuildings: null,
  neighboringBuildings: {
    id: '2003661',
    geom: null,
  },
  zoningLot: {
    id: 'zl1',
    zone: 'R6A',
  },
  site: {id: '1', bbls: ['2025540049']},
  scenario: {id: 'A', buildYear: 1999},
  name: 'foo',
  version: '1.0.0',
  versionBuildDate: '2021-07-18',
})


export const inc = () => {
  ++state.count
}


export const toggleDrawer = () => {
  state.drawer = !state.drawer
}


export const toggleInstructions = () => {
  state.showInstructions = !state.showInstructions
}


export const tryReconnect = () => {
  state.clientConnected = !state.clientConnected
}


export const setName = (name) => {
  state.name = name
}
