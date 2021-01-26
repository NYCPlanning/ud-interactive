import React from 'react'
import { useState } from 'react'

export default function PopupMessage({fadeBackground}) {
  const [visible, setVisible] = useState(true)

  const handleClick = (e) => {
    setVisible(false);
    fadeBackground();
  }

  if (visible) {
    return (
      <div id='popup-message' onClick={handleClick}>
        <div id='popup-contents'>
          HELLO
        </div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}