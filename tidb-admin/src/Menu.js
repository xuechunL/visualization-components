// in src/Menu.js
import React from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import StorageIcon from '@material-ui/icons/Storage'
import DeviceHubIcon from '@material-ui/icons/DeviceHub'
import EventNoteIcon from '@material-ui/icons/EventNote'
import ListIcon from '@material-ui/icons/List'

import {
  translate,
  DashboardMenuItem,
  MenuItemLink,
  Responsive,
} from 'react-admin'
import { withRouter } from 'react-router-dom'

// material design icons https://material.io/tools/icons/?style=baseline
// TODO: customized svg icons
const items = [
  { path: 'clustermap', name: 'Cluster Map', icon: <DeviceHubIcon /> },
  { path: 'storage', name: 'Storage', icon: <StorageIcon /> },
  { path: 'database', name: 'Database', icon: <ListIcon /> },
  { path: 'diagnose', name: 'Diagnose', icon: <EventNoteIcon /> },
]

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
}

const Menu = ({ onMenuClick, translate, logout }) => (
  <div style={styles.main}>
    <DashboardMenuItem onClick={onMenuClick} />
    {items.map(item => (
      <MenuItemLink
        key={item.path}
        to={`/${item.path}`}
        primaryText={translate(`${item.name}`, {
          smart_count: 2,
        })}
        leftIcon={item.icon}
        onClick={onMenuClick}
      />
    ))}
    <Responsive xsmall={logout} medium={null} />
  </div>
)

const enhance = compose(
  withRouter,
  connect(
    state => ({
      theme: state.theme,
      locale: state.i18n.locale,
    }),
    {}
  ),
  translate
)

export default enhance(Menu)
