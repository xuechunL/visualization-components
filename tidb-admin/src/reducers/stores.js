// in src/reducers/stores.js
import { STORES, STORE } from '../actions'

export default function stores(
  state = {
    isFetching: false,
    list: [],
    store: null,
  },
  action
) {
  switch (action.type) {
    case STORES.REQUEST:
      return { ...state, isFetching: true }
    case STORES.SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload.response.stores,
      }
    case STORE.REQUEST:
      return { ...state, isFetching: true }
    case STORE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        store: action.payload.response,
      }
    default:
      return state
  }
}
