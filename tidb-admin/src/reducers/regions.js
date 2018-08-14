// in src/reducers/regions.js
import { REGIONS, REGION } from '../actions'

export default function regions(
  state = {
    isFetching: false,
    list: [],
    region: null,
  },
  action
) {
  switch (action.type) {
    case REGIONS.REQUEST:
      return { ...state, isFetching: true }
    case REGIONS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload.response,
      }
    case REGION.REQUEST:
      return { ...state, isFetching: true }
    case REGION.SUCCESS:
      return {
        ...state,
        isFetching: false,
        region: action.payload.response,
      }
    default:
      return state
  }
}
