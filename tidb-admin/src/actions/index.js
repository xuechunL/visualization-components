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

/*****************************
 * export actions in a model *
 *****************************/

//action creator
function action(type, payload = {}) {
  return { type, payload }
}

// request action model
const requestActionModel = type => {
  return {
    request: () => action(type[REQUEST]),
    success: response => action(type[SUCCESS], { response }),
    failure: error => action(type[FAILURE], { error }),
  }
}

// export action models
export const cluster = requestActionModel(CLUSTER)
export const labels = requestActionModel(LABELS)
export const labelsStores = requestActionModel(LABELS_STORES)
export const stores = requestActionModel(STORES)
export const store = requestActionModel(STORE)
export const regions = requestActionModel(REGIONS)
export const region = requestActionModel(REGION)

// change theme actions
export const theme = {
  change: theme => action(THEME[CHANGE], { theme }),
}
