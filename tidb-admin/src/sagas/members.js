// in src/sagas/members.js
import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'

import { pdApi } from '../services'
import { members } from '../actions'

// TODO: make pdTimer configurable
const period = 60 * 1000

// TODO: abstract response handler
// fetch pd list
export function* fetchMembers() {
  while (true) {
    console.log('before a new fetch')
    yield put(members.request())
    const data = yield call(pdApi, {
      path: '/members',
    })
    if (data) yield put(members.success(data))
    else yield put(members.failure(data.message || 'REQUEST FAILURE'))
    yield delay(period)
  }
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchMembers() {
  console.log('watch fetch members')
  yield takeEvery('FETCH_MEMBERS', fetchMembers)
}
