// in src/containers/Admin.js
// Create App Component with <Admin> and <Resource> shortcut

import React from 'react'
// eslint-disable-next-line
import { Admin, Resource } from 'react-admin/lib'
import createHistory from 'history/createBrowserHistory'
import { createMuiTheme } from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'
import blue from '@material-ui/core/colors/blue'

// write our own Data Provider.
import { restProvider } from '../services'
import i18nProvider from '../i18nProvider'
import authProvider from '../authProvider'
import rootSaga from '../sagas'
import rootReducer from '../reducers'
import uiReducer from '../reducers/ui'

import AppLayout from '../Layout'
import { Overview } from '../containers'
import routes from '../customerRoutes'

import { StoreList } from '../resources'

const theme = createMuiTheme({
  palette: {
    // type: 'light', // Switching the dark mode on is a single property value change.
    primary: indigo,
    secondary: blue,
  },
})

const history = createHistory()

// TODO: refactor Login Page
// TODO: toggle i18n

// The <Admin> app uses redux-saga to handle side effects (AJAX calls, notifications, re-directions, etc).
const App = () => (
  <Admin
    title="TiDB Admin"
    theme={theme}
    history={history}
    appLayout={AppLayout}
    customRoutes={routes}
    customReducers={{ pdServers: rootReducer, globalUI: uiReducer }}
    customSagas={[rootSaga]}
    dashboard={Overview}
    dataProvider={restProvider}
    i18nProvider={i18nProvider}
    authProvider={authProvider}>
    <Resource name="stores" list={StoreList} />
  </Admin>
)

export default App
