// in src/containers/App.js

import React from 'react'
// eslint-disable-next-line
import { Admin, Resource } from 'react-admin/lib';

// write our own Data Provider.
import { restProvider } from '../services'
import rootSaga from '../sagas'
import rootReducer from '../reducers'

import { Overview, RegionList } from '../containers'

// The <Admin> app uses redux-saga to handle side effects (AJAX calls, notifications, re-directions, etc).
const App = () => (
  <Admin
    title="TiDB Admin"
    customReducers={{ pdServers: rootReducer }}
    customSagas={[rootSaga]}
    dashboard={Overview}
    dataProvider={restProvider}
  >
    <Resource name="regions" list={RegionList} />
  </Admin>
)

export default App
