// in src/reducers/ui.js
import { THEME } from '../actions'

export default function uiReducer(
  state = {
    theme: 'light',
  },
  action
) {
  switch (action.type) {
    case THEME.CHANGE:
      return { ...state, theme: action.payload.theme }
    default:
      return state
  }
}
