// in src/reducers/members.js
import { MEMBERS } from '../actions'

export default function members(
  state = {
    isFetching: false,
    list: [],
    leader: null,
  },
  action
) {
  switch (action.type) {
    case MEMBERS.REQUEST:
      return { ...state, isFetching: true }
    case MEMBERS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload.response.members,
        leader: action.payload.response.leader,
      }
    default:
      return state
  }
}
