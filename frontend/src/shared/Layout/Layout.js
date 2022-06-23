import React from 'react'
import {Fragment} from 'react'
import Navbar from './Navbar'

///Basic Layout of Every Page || Includes shared components such as Background, Navbar etc
const Layout = (props) => {
  return (
      <Fragment>
          <Navbar/>
          <main>{props.children}</main>
      </Fragment>
  )
}

export default Layout