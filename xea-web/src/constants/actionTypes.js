const SEARCH_EVENTS = 'SEARCH_EVENTS'

export default SEARCH_EVENTS

// Action types related with login process.
// Login failure implies we had a response.
// Login failure implies an error which prevented the request to be submited.
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_ERROR = 'LOGIN_ERROR'

// Actions related with logout.
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_IN_PROGRESS = 'LOGOUT_IN_PROGRESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export const DISMISS_AUTH_ERROR_MESSAGE = 'DISMISS_AUTH_ERROR_MESSAGE'
