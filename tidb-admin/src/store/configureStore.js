// in src/store/configureStore.js
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'

export default function configureStore(initialState) {
  // 注意：必须满足 redux@>=3.1.0 才可以将 middleware 作为 createStore 的最后一个参数传递
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run,
  }
}
