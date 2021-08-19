import { useSnapshot } from 'valtio';

import { nextPos, previousPos, state } from '../state'

const AltNavigation = () => {
  const { cameras, index } = useSnapshot(state);

  return (
    <div id='nav-root'>
      <button onClick={nextPos}>Next</button>
      <button onClick={previousPos}>Prev</button>
      <div>PLACEHOLDER: ←→↑↓</div>
      <div>{cameras.length} cameras loaded</div>
      <div>on {index}</div>
    </div>
  )
}

export default AltNavigation
