import { useGesture } from 'react-use-gesture'

import icon from '../assets/eye.svg'

const LookAroundControls = () => {
  console.log('lookaround controls loaded')

  const bind = useGesture({
    onDrag: (state) => console.log(state),
  })

  return (
    <div
      {...bind()}
      className='fixed top-0 right-0 m-2 w-8 h-8 bg-black' 
    >
    </div>
  )
}

export default LookAroundControls
