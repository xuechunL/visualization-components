// in src/customRoutes.js
import React from 'react'
import { Route } from 'react-router-dom'
import { ClusterMap, Storage, Database } from './containers'

export default [
  <Route exact path="/clustermap" component={ClusterMap} />,
  <Route exact path="/storage" component={Storage} />,
  <Route exact path="/database" component={Database} />,
]
