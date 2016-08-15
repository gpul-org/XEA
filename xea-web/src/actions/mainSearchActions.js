import * as types from '../constants/actionTypes'

export default function searchEvents (settings) {
  return { type: types.SEARCH_EVENTS, settings }
}
