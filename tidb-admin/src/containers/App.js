// in src/containers/Admin.js
// Create App Component with <Admin> and <Resource> shortcut

import React from 'react'
// eslint-disable-next-line
import { Admin, Resource } from 'react-admin/lib';
import { createMuiTheme } from '@material-ui/core/styles'

// write our own Data Provider.
import { restProvider } from '../services'
import rootSaga from '../sagas'
import rootReducer from '../reducers'
import uiReducer from '../reducers/ui'

import AppLayout from '../Layout'
import { Overview } from '../containers'
import routes from '../customerRoutes'

import { RegionList } from '../resources/Regions'

const theme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
})

// The <Admin> app uses redux-saga to handle side effects (AJAX calls, notifications, re-directions, etc).
const App = () => (
  <Admin
    title="TiDB Admin"
    theme={theme}
    appLayout={AppLayout}
    customRoutes={routes}
    customReducers={{ pdServers: rootReducer, globalUI: uiReducer }}
    customSagas={[rootSaga]}
    dashboard={Overview}
    dataProvider={restProvider}
  >
    <Resource name="regions" list={RegionList} />
  </Admin>
)

export default App
