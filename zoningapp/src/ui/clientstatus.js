import React from 'react'
import { useSnapshot } from 'valtio'
import { state, tryReconnect } from '../services/state'

export default () => {
  const snap = useSnapshot(state)
  const connected = snap.clientConnected

  const connectedSpan = <span>Connected to Rhino ●</span>
  const disconnectedSpan = <span className='cursor-pointer' onClick={tryReconnect}>Disconnected ↺</span>

  return (
    <div className={connected ? 'mb-6 text-green-400 green-glow' : 'mb-4 text-red-600'}>
      { connected ? connectedSpan : disconnectedSpan }
    </div>
  )
}