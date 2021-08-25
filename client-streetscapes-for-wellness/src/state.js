import { proxy } from 'valtio'


export const state = proxy({
  index: 0,
  cameras: [],
  animations: [],
  annotations: [],
  scene: null,
  sunPosition: [50, 100, 50],
  dematerialize: false,
  showAnnotations: false,
  showDebugger: false,
  showCaptions: false,
  isLoaded: false,
})


const increment = (n) => {
  if ( state.index + n > state.cameras.length - 1 ) state.index = 0
  else if ( state.index + n < 0 ) state.index = state.cameras.length - 1
  else state.index += n
}


export const nextPos = () => {
  increment(1)
}


export const previousPos = () => {
  increment(-1)
}
