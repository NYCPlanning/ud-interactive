import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import BuildDetails from '../components/builddetails'
import Nav from '../components/nav'
import '../style/main.css'

const Layout = ({ children }) => {
  return(
    <Router>
      <div className='w-full h-full flex flex-col items-center'>
        <div className='w-full flex flex-col max-w-screen-sm p-4 pb-24 space-y-6'>
          <Nav />
          <BuildDetails />
          {children}
        </div>
      </div>
    </Router>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout