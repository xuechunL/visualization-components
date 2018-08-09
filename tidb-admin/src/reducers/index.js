// in src/reducers/index.js
import { combineReducers } from 'redux'

import stores from './stores'
import cluster from './cluster'

const rootReducer = combineReducers({
  stores,
  cluster,
})

export default rootReducer
