import { proxy } from 'valtio'

const state = proxy({
  frame: {
    center: [40.7128, -74.0060],
    date: '2021-08-16',
    time: '16:46',
  },
  sunParam: 0.5,
  autoRotate: false,
  currentScene: null,
  radiation: 0,
  serverVersion: '',
})

export const getISODateTime = () => {
  const date = new Date(`${state.frame.date}T${state.frame.time}`)
  return date.toISOString()
}

export default state
