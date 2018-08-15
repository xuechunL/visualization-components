// in src/customRoutes.js
import React from 'react'
import { Route } from 'react-router-dom'

import { ClusterMap, Storage, Database, StoreDetail, RegionDetail } from './containers'

export default [
  <Route exact path="/clustermap" component={ClusterMap} />,
  <Route exact path="/storage" component={Storage} />,
  <Route exact path="/database" component={Database} />,
  <Route exact path="/store/:storeid" component={StoreDetail} />,
  <Route exact path="/region/:regionid" component={RegionDetail} />,
]
