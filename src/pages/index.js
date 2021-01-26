import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../layouts/default'

const IndexPage = () => (
  <Layout>
    <SEO title='Home' />
    <div className='mt-8 p-4'>
      <h2>Demos</h2>
      <ul>
        <li>
          <Link to='/residential-buildings'>
            Residential Buildings
          </Link>
        </li>
      </ul>
    </div>
  </Layout>
)

export default IndexPage
