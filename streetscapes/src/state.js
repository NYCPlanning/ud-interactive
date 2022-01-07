import { proxy } from 'valtio'


export const state = proxy({
  animations: [],
  annotations: [],
  cameras: [],
  currentViewName: '',
  dematerialize: false,
  index: 0,
  isLoaded: false,
  scene: null,
  showAnnotations: false,
  showCaptions: false,
  showDebugger: false,
  sunPosition: [50, 100, 50],
  title: '',
})


const increment = (n) => {
  if ( state.index + n > state.cameras.length - 1 ) state.index = 0
  else if ( state.index + n < 0 ) state.index = state.cameras.length - 1
  else state.index += n

  const { userData: { viewName }} = state.cameras[state.index]
  state.currentViewName = viewName ? viewName : ''
}


export const nextPos = () => {
  increment(1)
}


export const previousPos = () => {
  increment(-1)
}
