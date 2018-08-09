// in src/reducers/cluster.js
import { CLUSTER } from '../actions'

export default function cluster(
  state = {
    isFetching: false,
    status: null,
  },
  action
) {
  switch (action.type) {
    case CLUSTER.REQUEST:
      return { ...state, isFetching: true }
    case CLUSTER.SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: action.payload.response,
      }
    default:
      return state
  }
}
