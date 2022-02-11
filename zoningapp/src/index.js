import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'

import { client } from './services/graphql'
import './index.css'

// import Controls from './ui/controls'
import Controls from './ui/ui'
import Scene from './scene/scene'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <div className='w-full h-full flex'>
        {/* <Drawer /> */}
        <Controls />
        <Scene />
      </div>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
