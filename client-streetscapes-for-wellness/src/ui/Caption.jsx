import React from 'react'
import { useSnapshot } from 'valtio'

import { state } from '../state'

const Caption = () => {
  const { index, cameras } = useSnapshot(state)
  const captions = cameras.map((c) => c.parent.userData.caption)

  return (
    <div>
      <span>{captions[index]}</span>
    </div>
  )
}

export default Caption