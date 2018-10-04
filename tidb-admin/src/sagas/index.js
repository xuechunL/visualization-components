// in src/sagas/index.js
import { all } from 'redux-saga/effects'
import { watchFetchLabels, watchFetchLabelsStores } from './labels'
import { watchFetchClusterStatus, watchFetchFetchTiDBServers } from './cluster'
import { watchFetchMembers } from './members'
import { watchFetchStores, watchFetchStore } from './stores'
import { watchFetchMetrics } from './metrics'
import {
  watchFetchRegions,
  watchFetchRegionById,
  watchFetchRegionByKey,
} from './regions'

export default function* rootSaga() {
  yield all([
    watchFetchClusterStatus(),
    watchFetchFetchTiDBServers(),
    watchFetchLabels(),
    watchFetchLabelsStores(),
    watchFetchMembers(),
    watchFetchStores(),
    watchFetchStore(),
    watchFetchRegions(),
    watchFetchRegionById(),
    watchFetchRegionByKey(),
    watchFetchMetrics(),
  ])
}
