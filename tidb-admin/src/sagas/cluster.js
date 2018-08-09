// in src/sagas/cluster.js
import { put, call, takeEvery } from 'redux-saga/effects'
import { API } from '../services'
import { cluster } from '../actions'

// fetch cluster status
export function* fetchClusterStatus() {
  yield put(cluster.request())
  // const { data, message } = yield call(API, { url: '/cluster/status' })
  const data = yield call(API, { url: '/cluster/status' })
  console.log('/cluster/status - response data: ', data)
  if (data) yield put(cluster.success(data))
  else yield put(cluster.failure(data.message || 'REQUEST FAILURE'))
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchClusterStatus() {
  yield takeEvery('FETCH_CLUSTER_STATUS', fetchClusterStatus)
}
