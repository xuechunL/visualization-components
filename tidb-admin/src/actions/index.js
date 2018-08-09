// in src/actions/index.js
// common actions type

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

// stores actions type
// FIXME: fetch action
export const FETCH_STORES = 'FETCH_STORES'
export const FETCH_STORE = 'FETCH_STORE'
export const STORES = createRequestTypes('STORES')
export const STORE = createRequestTypes('STORE')

// cluster actions type
export const FETCH_CLUSTER_STATUS = 'FETCH_CLUSTER_STATUS'
export const CLUSTER = createRequestTypes('CLUSTER')

// abstraction
function action(type, payload = {}) {
  return { type, ...payload }
}

// export actions
export const stores = {
  fetch: () => action(FETCH_STORES),
  request: () => action(STORES[REQUEST]),
  success: response => action(STORES[SUCCESS], { response }),
  failure: error => action(STORES[FAILURE], { error }),
}

export const store = {
  fetch: () => action(FETCH_STORE),
  request: id => action(STORE[REQUEST], { id }),
  success: (id, response) => action(STORE[SUCCESS], { id, response }),
  failure: (id, error) => action(STORE[FAILURE], { id, error }),
}

export const cluster = {
  fetch: () => action(FETCH_CLUSTER_STATUS),
  request: () => action(STORE[REQUEST]),
  success: response => action(STORE[SUCCESS], { response }),
  failure: error => action(STORE[FAILURE], { error }),
}
