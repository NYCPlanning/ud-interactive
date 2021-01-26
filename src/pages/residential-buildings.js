import React from 'react'

import Layout from '../layouts/default'
import Preview3D from '../components/Preview3D'

const ResidentialBuildings = () => (
  <Layout>
    <Preview3D />
    <style>{`
      .three-canvas {
        background: linear-gradient(#dbe9cb, #5a723e);
      }
    `}</style>
  </Layout>
)

export default ResidentialBuildings
