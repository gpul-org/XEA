

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
  console.log(action.type)
  switch (action.type) {
    case LOGIN_IN_PROGRESS:
      console.log('inProgress...')
      return { ...state, inProgress: true }
    case LOGIN_SUCCESS:
      console.log('Log in success :)')
      window.localStorage.setItem('token', action.payload)
      return { ...state, token: action.payload, inProgress: false, error: false }
    case LOGIN_FAILURE:
      console.log('Log in failure :(')
      return {
        ...state,
        token: null,
        inProgress: false,
        error: true,
        errorMessage: action.payload
      }
    case LOGIN_ERROR:
      console.log('Log in error XP')
      console.log('payload', action.payload.message)
      return {
        ...state,
        token: null,
        inProgress: false,
        error: true,
        errorMessage: action.payload.message
      }
    case LOGOUT_SUCCESS:
      // We redirect to the main page.
      console.log('Log out success :)')
      // browserHistory.push('/main')
      return { ...state, token: null, inProgress: false, error: null }
    case LOGOUT_FAILURE:
      // As the token was invalid we must be alredy without authorization.
      console.log('Log out failure :(')
      // browserHistory.push('/main')
      return { ...state, inProgress: false, errorMessage: action.payload }
    case LOGOUT_ERROR:
      console.log('Log out error XP')
      return { ...state, inProgress: false, errorMessage: action.payload }
    case DISMISS_AUTH_ERROR_MESSAGE:
      console.log('Dismiss auth error :/')
      return { ...state, errorMessage: null }
    default:
      return state
  }
}
