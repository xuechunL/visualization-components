// in src/containers/App.js

import React from 'react'
// eslint-disable-next-line
import { Admin, Resource } from 'react-admin/lib';

// write our own Data Provider.
import { restProvider } from '../services'

import { Overview, RegionList } from '../containers'

const App = () => (
  <Admin title="TiDB Admin" dashboard={Overview} dataProvider={restProvider}>
    <Resource name="regions" list={RegionList} />
  </Admin>
)

export default App
