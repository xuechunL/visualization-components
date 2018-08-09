// in src/sagas/cluster.js
import { put, call } from 'redux-saga/effects'
import { API } from '../services'
import { cluster } from '../actions'

// fetch cluster status
export function* fetchClusterStatus() {
  yield put(cluster.request())
  const { response, error } = yield call(API, { url: '/cluster/status' })
  if (response) yield put(cluster.success(response))
  else yield put(cluster.failure(error))
}
