// in src/sagas/stores.js
import { put, call } from 'redux-saga/effects'

import { API } from '../services'
import { stores, store } from '../actions'

// fetch store list
export function* fetchStores() {
  yield put(stores.request())
  const { response, error } = yield call(API, { url: '/stores' })
  if (response) yield put(stores.success(response))
  else yield put(stores.failure(error))
}

// fetch a specific store
export function* fetchStore(id) {
  yield put(store.request())
  const { response, error } = yield call(API, { url: `/store/${id}` })
  if (response) yield put(store.success(response))
  else yield put(store.failure(error))
}
