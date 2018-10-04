// in src/reducers/METRICS.js
import { METRICS } from '../actions'

export default function metrics(
  state = {
    isFetching: false,
    tidb_server_query_totals: [],
    tidb_server_connections: [],
  },
  action
) {
  switch (action.type) {
    case METRICS.REQUEST:
      return { ...state, isFetching: true }
    case METRICS.SUCCESS: {
      const metric = action.payload.response
      console.log('metric', metric)
      return {
        ...state,
        ...metric,
        isFetching: false,
      }
    }

    default:
      return state
  }
}
