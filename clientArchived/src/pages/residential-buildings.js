import React from 'react'

import Layout from '../layouts/default'
import SEO from '../components/seo'
import Preview3D from '../components/preview3d'

const ResidentialBuildings = () => (
  <Layout>
    <SEO title='Residential Buildings' />
    <Preview3D />
    <style>{`
      .three-canvas {
        background: linear-gradient(#dbe9cb, #5a723e);
      }
    `}</style>
  </Layout>
)

export default ResidentialBuildings
