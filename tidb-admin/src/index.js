// in src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

import configureStore from './store/configureStore'
import rootSaga from './sagas'

const store = configureStore()
store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
