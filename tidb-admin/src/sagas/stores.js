// in src/sagas/stores.js
import { put, call, takeEvery } from 'redux-saga/effects'

import { API } from '../services'
import { stores, store } from '../actions'

// TODO: abstract response handler
// fetch store list
export function* fetchStores() {
  yield put(stores.request())
  const data = yield call(API, { url: '/stores' })
  if (data) yield put(stores.success(data.stores))
  else yield put(stores.failure(data.message || 'REQUEST FAILURE'))
}

// fetch a specific store
export function* fetchStore(action) {
  yield put(store.request())
  const data = yield call(API, {
    url: `/store/${action.payload.id}`,
  })
  console.log('store', data)
  if (data) yield put(store.success(data))
  else yield put(store.failure(data.message || 'REQUEST FAILURE'))
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchStores() {
  console.log('watch fetch stores')
  yield takeEvery('FETCH_STORES', fetchStores)
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchStore() {
  console.log('watch fetch store')
  yield takeEvery('FETCH_STORE', fetchStore)
}
