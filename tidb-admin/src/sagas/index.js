// in src/sagas/index.js
import { all } from 'redux-saga/effects'
import { watchFetchClusterStatus } from './cluster'
import { watchFetchStores, watchFetchStore } from './stores'

export default function* rootSaga() {
  yield all([watchFetchClusterStatus(), watchFetchStores(), watchFetchStore()])
}
