import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { ApolloProvider, gql, useSubscription, useMutation } from '@apollo/client'
import { client } from '../sources/realtime'
import Header from "../components/header"

const Layout = ({ title, children }) => {
  return (
    <ApolloProvider client={client}>
      <div className='w-full h-full flex flex-col'>
        {children}
      </div>
    </ApolloProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
