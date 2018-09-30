// in src/sagas/cluster.js
import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'
import { pdApi, prometheusApi } from '../services'
import { cluster, tidbServers } from '../actions'

// TODO:
const period = 60 * 1000

// fetch cluster status
export function* fetchClusterStatus() {
  yield put(cluster.request())
  // const { data, message } = yield call(pdApi, { path: '/cluster/status' })
  const data = yield call(pdApi, {
    path: '/cluster/status',
  })
  if (data) yield put(cluster.success(data))
  else yield put(cluster.failure(data.message || 'REQUEST FAILURE'))
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchClusterStatus() {
  yield takeEvery('FETCH_CLUSTER_STATUS', fetchClusterStatus)
}

// fetch TiDB servers
export function* fetchTiDBServers() {
  // TODO: polish interval
  while (true) {
    yield put(tidbServers.request())
    // const { data, message } = yield call(pdApi, { path: '/cluster/status' })
    const upServers = yield call(prometheusApi, {
      metricParams: 'up{job="tidb"}',
    })
    const downServers = yield call(prometheusApi, {
      metricParams: 'down{job="tidb"}',
    })

    // console.log('down servers', downServers)
    // console.log('up servers', upServers)
    // console.log('servers', upServers.concat(downServers))

    yield put(tidbServers.success(upServers.concat(downServers)))
    yield delay(period)
  }
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchFetchTiDBServers() {
  yield takeEvery('FETCH_TIDB_SERVERS', fetchTiDBServers)
}
