import React from 'react'
import { Link, graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../layouts/default'

export const query = graphql`
  query AllPages {
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`

const excludePages = [
  '/dev-404-page/',
  '/404/',
  '/',
  '/404.html',
]

const PageLink = ({path}) => {
  return (
    <li>
      <Link to={path}>
        {path}
      </Link>
    </li>
  )
}

const IndexPage = ({data}) => {
  const { allSitePage: { edges: pages }} = data

  const pageLinks = pages.filter(({ node: { path }}) => (
      !excludePages.includes(path)
    )).map((p, i) => (
      <PageLink path={p.node.path} key={i} />
    ))

  return (
    <Layout>
      <SEO title='Home' />
      <div className='mt-8 p-4'>
        <h2>Demos</h2>
        <ul>
          {pageLinks}
        </ul>
      </div>
    </Layout>
  )
}


export default IndexPage
