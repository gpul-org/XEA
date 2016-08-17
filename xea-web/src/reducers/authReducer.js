import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_ERROR } from '../constants/actionTypes'

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('Login success: yipie!')
      window.localStorage.setItem('token', action.payload)
      return { ...state, token: action.payload, authenticated: true }
    case LOGIN_FAILURE:
      console.log('Login failure:', action.payload)
      return { ...state, token: undefined, authenticated: false }
    case LOGIN_ERROR:
      console.log('Login error:', action.payload)
      return state
    default:
      return state
  }
}
