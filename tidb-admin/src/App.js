// in src/App.js

import React from 'react';
// eslint-disable-next-line
import { Admin, Resource } from 'react-admin';

// write our own Data Provider.
import restProvider from './restProvider'


import Overview from './overview';
import { RegionList } from './regions';

const App = () => (
  <Admin title="TiDB Admin" dashboard={Overview} dataProvider={restProvider}>
    <Resource name="regions" list={RegionList} />
  </Admin>
);

export default App;
