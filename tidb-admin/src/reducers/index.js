// in src/reducers/index.js
import { combineReducers } from 'redux'

import labels from './labels'
import cluster from './cluster'
import members from './members'
import stores from './stores'
import regions from './regions'

const rootReducer = combineReducers({
  labels,
  cluster,
  members,
  stores,
  regions,
})

export default rootReducer
