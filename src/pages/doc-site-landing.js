import React, { useEffect, useState } from 'react'
import Blank from '../layouts/blanknoprovider'
import Scene from '../scenes/doc-site/scene'
import { format } from 'date-fns'

const dateFormatted = () => format(new Date(), 'hh:mm:ss')

export default () => {
  const [time, setTime] = useState(dateFormatted())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dateFormatted())
    }, 1000)
  
    return () => {
      clearInterval(interval)
    }
  }, [])

  // setInterval(() => {
  //   this.setState({
  //     dateTime : dateFormatted()
  //   })
  // }, 60000)

  return (
    <Blank>
      <Scene />
      <span className='blue code tiny fixed bottom-0 right-0 p-4'>
        NYC Time: {time}
      </span>
    </Blank>
  )
}

