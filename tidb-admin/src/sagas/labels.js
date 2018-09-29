// in src/sagas/stores.js
import { put, call, takeEvery } from 'redux-saga/effects'

import { API } from '../services'
import { labels, labelsStores } from '../actions'

// TODO: abstract response handler
// fetch all label values
export function* fetchLabels() {
  yield put(labels.request())
  const data = yield call(API, {
    path: '/labels',
  })
  yield put(labels.success(data))
  // else yield put(labels.failure(data.message || 'REQUEST FAILURE'))
}

// fetch stores that have specific label values.
export function* fetchLabelsStores() {
  yield put(labelsStores.request())
  const data = yield call(API, {
    path: `/labels/stores`,
  })
  yield put(labelsStores.success(data))
  // else yield put(labelsStores.failure(data.message || 'REQUEST FAILURE'))
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchLabels() {
  console.log('watch fetch all labels')
  yield takeEvery('FETCH_LABELS', fetchLabels)
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchLabelsStores() {
  console.log('watch fetch stores that have specific labels')
  yield takeEvery('FETCH_LABELS_STORES', fetchLabelsStores)
}
