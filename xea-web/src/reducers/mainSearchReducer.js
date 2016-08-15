import { SEARCH_EVENTS } from '../constants/actionTypes'
import initialState from './initialState'

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
export default function mainSearchReducer (state = initialState.mainSearch, action) {
  switch (action.type) {
    case SEARCH_EVENTS:
      // TODO Query elements in API
      return state

    default:
      return state
  }
}
