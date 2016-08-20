import {
  LOGIN_SUCCESS,
  LOGIN_IN_PROGRESS,
  LOGIN_FAILURE,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_ERROR,
  DISMISS_AUTH_ERROR_MESSAGE
} from '../constants/actionTypes'

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_IN_PROGRESS:
      return { ...state, inProgress: true }
    case LOGIN_SUCCESS:
      window.localStorage.setItem('token', action.payload)
      return { ...state, token: action.payload, inProgress: false, errorMessage: null }
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        inProgress: false,
        errorMessage: action.payload
      }
    case LOGIN_ERROR:
      return {
        ...state,
        token: null,
        inProgress: false,
        errorMessage: action.payload.message
      }
    case LOGOUT_SUCCESS:
      return { ...state, token: null, inProgress: false, errorMessage: null }
    case LOGOUT_FAILURE:
      // As the token was invalid we must be alredy without authorization.
      return { ...state, inProgress: false, errorMessage: action.payload }
    case LOGOUT_ERROR:
      return { ...state, inProgress: false, errorMessage: action.payload }
    case DISMISS_AUTH_ERROR_MESSAGE:
      return { ...state, errorMessage: null }
    default:
      return state
  }
}
