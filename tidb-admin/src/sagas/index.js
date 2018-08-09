// in src/sagas/index.js
import { takeEvery } from 'redux-saga/effects'
import * as actions from '../actions'
import { fetchClusterStatus } from './cluster'
import { fetchStores, fetchStore } from './stores'

// FIXME: not work
export default function* rootSaga() {
  console.log('actions', actions)
  yield takeEvery(actions.FETCH_CLUSTER_STATUS, fetchClusterStatus)
  yield takeEvery(actions.FETCH_STORES, fetchStores)
  yield takeEvery(actions.FETCH_STORE, fetchStore)
}
