// in src/sagas/regions.js
import { put, call, takeEvery } from 'redux-saga/effects'

import { API } from '../services'
import { regions, region } from '../actions'

// TODO: abstract response handler
// fetch region list
export function* fetchRegions() {
  yield put(regions.request())
  const data = yield call(API, {
    path: '/regions',
  })
  if (data) yield put(regions.success(data.regions))
  else yield put(regions.failure(data.message || 'REQUEST FAILURE'))
}

// fetch a specific region by id
export function* fetchRegionById(action) {
  yield put(region.request())
  const data = yield call(API, {
    path: `/region/id/${action.payload.id}`,
  })
  console.log('region', data)
  if (data) yield put(region.success(data))
  else yield put(region.failure(data.message || 'REQUEST FAILURE'))
}

// fetch a specific region by key
export function* fetchRegionByKey(action) {
  yield put(region.request())
  const data = yield call(API, {
    path: `/region/key/${action.payload.key}`,
  })
  console.log('region', data)
  if (data) yield put(region.success(data))
  else yield put(region.failure(data.message || 'REQUEST FAILURE'))
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchRegions() {
  console.log('watch fetch regions')
  yield takeEvery('FETCH_REGIONS', fetchRegions)
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchRegionById() {
  console.log('watch fetch region by id')
  yield takeEvery('FETCH_REGION_BY_ID', fetchRegionById)
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchRegionByKey() {
  console.log('watch fetch region by key')
  yield takeEvery('FETCH_REGION_BY_KEY', fetchRegionByKey)
}
