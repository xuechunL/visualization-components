// in src/actions/index.js

/**************************
 * global ui actions type *
 **************************/

const CHANGE = 'CHANGE'

function creatUIActionTypes(base) {
  return [CHANGE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

// change theme actions type
export const THEME = creatUIActionTypes('THEME')

/************************
 * request actions type *
 ************************/

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

// request action type creator
function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

// cluster actions type
export const CLUSTER = createRequestTypes('CLUSTER')
// stores actions type
export const STORES = createRequestTypes('STORES')
export const STORE = createRequestTypes('STORE')
// regions actions type
export const REGIONS = createRequestTypes('REGIONS')
export const REGION = createRequestTypes('REGION')
// labels actions type
export const LABELS = createRequestTypes('LABELS')
export const LABELS_STORES = createRequestTypes('LABELS_STORES')

/******************
 * action creator *
 ******************/
function action(type, payload = {}) {
  return { type, payload }
}

/******************
 * export actions *
 ******************/

// change theme actions
export const theme = {
  change: theme => action(THEME[CHANGE], { theme }),
}

// request actions
export const cluster = {
  request: () => action(CLUSTER[REQUEST]),
  success: response => action(CLUSTER[SUCCESS], { response }),
  failure: error => action(CLUSTER[FAILURE], { error }),
}
export const stores = {
  request: () => action(STORES[REQUEST]),
  success: response => action(STORES[SUCCESS], { response }),
  failure: error => action(STORES[FAILURE], { error }),
}

export const store = {
  request: id => action(STORE[REQUEST], { id }),
  success: response => action(STORE[SUCCESS], { response }),
  failure: error => action(STORE[FAILURE], { error }),
}

export const regions = {
  request: () => action(REGIONS[REQUEST]),
  success: response => action(REGIONS[SUCCESS], { response }),
  failure: error => action(REGIONS[FAILURE], { error }),
}

export const region = {
  request: key => action(REGION[REQUEST], { key }),
  success: response => action(REGION[SUCCESS], { response }),
  failure: error => action(REGION[FAILURE], { error }),
}

export const labels = {
  request: () => action(REGIONS[REQUEST]),
  success: response => action(REGIONS[SUCCESS], { response }),
  failure: error => action(REGIONS[FAILURE], { error }),
}

export const labelsStores = {
  request: () => action(REGION[REQUEST]),
  success: response => action(REGION[SUCCESS], { response }),
  failure: error => action(REGION[FAILURE], { error }),
}
