// in src/reducers/labels.js
import { LABELS, LABELS_STORES } from '../actions'

export default function labels(
  state = {
    isFetching: false,
    values: [],
    stores: [],
  },
  action
) {
  switch (action.type) {
    case LABELS.REQUEST:
      return { ...state, isFetching: true }
    case LABELS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        values: action.payload.response,
      }
    case LABELS_STORES.REQUEST:
      return { ...state, isFetching: true }
    case LABELS_STORES.SUCCESS:
      return {
        ...state,
        isFetching: false,
        stores: action.payload.response,
      }
    default:
      return state
  }
}
