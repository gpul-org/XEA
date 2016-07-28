import * as types from '../constants/actionTypes'

export function searchEvents (settings) {
  return {type: types.SEARCH_EVENTS, settings}
}
