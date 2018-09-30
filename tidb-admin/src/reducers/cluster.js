// in src/reducers/cluster.js
import { CLUSTER, TIDB_SERVERS } from '../actions'

export default function cluster(
  state = {
    isFetching: false,
    status: null,
    tidbServers: [],
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
    case TIDB_SERVERS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        tidbServers: action.payload.response,
      }
    default:
      return state
  }
}
