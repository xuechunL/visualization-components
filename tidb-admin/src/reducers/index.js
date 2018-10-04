// in src/reducers/index.js
import { combineReducers } from 'redux'

import labels from './labels'
import cluster from './cluster'
import members from './members'
import stores from './stores'
import regions from './regions'
import metrics from './metrics'

const rootReducer = combineReducers({
  labels,
  cluster,
  members,
  stores,
  regions,
  metrics,
})

export default rootReducer
