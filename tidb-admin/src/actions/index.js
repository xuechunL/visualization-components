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
export const STORES = createRequestTypes('STORES')
export const STORE = createRequestTypes('STORE')

// cluster actions type
export const CLUSTER = createRequestTypes('CLUSTER')

// abstraction
function action(type, payload = {}) {
  return { type, payload }
}

// export actions
export const stores = {
  request: () => action(STORES[REQUEST]),
  success: response => action(STORES[SUCCESS], { response }),
  failure: error => action(STORES[FAILURE], { error }),
}

export const store = {
  request: id => action(STORE[REQUEST], { id }),
  success: (id, response) => action(STORE[SUCCESS], { id, response }),
  failure: (id, error) => action(STORE[FAILURE], { id, error }),
}

export const cluster = {
  request: () => action(CLUSTER[REQUEST]),
  success: response => action(CLUSTER[SUCCESS], { response }),
  failure: error => action(CLUSTER[FAILURE], { error }),
}
