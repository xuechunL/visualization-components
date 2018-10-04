// in src/sagas/cluster.js
import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'
import { prometheusApi } from '../services'
import { metrics } from '../actions'

// TODO:
const period = 60 * 1000

// fetch metrics
export function* fetchMetrics(action) {
  // TODO: polish interval
  while (true) {
    const {
      metricParams = 'tidb_server_query_totals',
      metricType = 'query_range',
    } = action.payload.metric
    yield put(metrics.request())
    // const { data, message } = yield call(pdApi, { path: '/cluster/status' })
    const metricValues = yield call(prometheusApi, { metricType, metricParams })

    // console.log('down servers', downServers)
    // console.log('up servers', upServers)
    // console.log('servers', upServers.concat(downServers))

    yield put(metrics.success({ [metricParams]: metricValues }))
    yield delay(period)
  }
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchMetrics() {
  yield takeEvery('FETCH_METRICS', fetchMetrics)
}
