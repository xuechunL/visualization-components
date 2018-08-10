// in src/Layout.js
import React from 'react'
import { Layout } from 'react-admin'
// import AppBar from './AppBar'
import Menu from './Menu'
// import Notification from './Notification'

const AppLayout = props => <Layout {...props} menu={Menu} />

export default AppLayout
