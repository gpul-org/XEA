import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_ERROR
} from '../constants/actionTypes'

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      window.localStorage.setItem('token', action.payload)
      return { ...state, token: action.payload }
    case LOGIN_FAILURE:
      return { ...state, token: undefined }
    case LOGIN_ERROR:
      return state
    case LOGOUT_SUCCESS:
      return { ...state, token: undefined }
    case LOGOUT_FAILURE:
      // As the token was invalid we must be alredy without authorization.
      return { ...state, token: undefined }
    case LOGOUT_ERROR:
      return state
    default:
      return state
  }
}
