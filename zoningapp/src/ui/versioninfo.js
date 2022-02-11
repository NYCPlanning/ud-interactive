import React from 'react'
import { useSnapshot } from 'valtio'
import { state } from '../services/state'

const VersionInfo = () => {
  const snap = useSnapshot(state)
  const shortVersion = snap.version.split('.').slice(0,2).join('.')

  return (
    <div className='mr-2'>UDTools {shortVersion}</div>
  )
}

export default VersionInfo
