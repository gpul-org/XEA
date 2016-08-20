import axios from 'axios'
import { browserHistory } from 'react-router'

import { LOGIN_URL, LOGOUT_URL } from '../constants/urls'
import {
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_ERROR,
  LOGOUT_IN_PROGRESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_ERROR,
  DISMISS_AUTH_ERROR_MESSAGE
} from '../constants/actionTypes'

export function loginRequest ({ username, password }) {
  return dispatch => {
    dispatch({
      type: LOGIN_IN_PROGRESS
    })

    const requestCfg = {
      method: 'post',
      timeout: 3000,
      auth: {
        username,
        password
      },
      validateStatus: () => true
    }

    axios(LOGIN_URL, requestCfg)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.token
          })
        } else {
          dispatch({
            type: LOGIN_FAILURE,
            payload: response.data.detail
          })
        }
      })
      .catch(error => {
        dispatch({
          type: LOGIN_ERROR,
          payload: error
        })
      })

    // // Basic authorization hash <- base64 username(=username):password
    // const hash = window.btoa(`${username}:${password}`)
    // // We need to build our headers
    // const headers = new window.Headers({
    //   Authorization: `Basic ${hash}`
    // })
    // const fetchCfg = {
    //   method: 'post',
    //   headers
    // }

    // window.fetch(LOGIN_URL, fetchCfg).then(response => {
    //   console.log('response: ', response)
    //   if (response.ok) {
    //     // Save token, change client state.
    //     response.json().then(data => {
    //       console.log('response ok data:', data)
    //       dispatch({
    //         type: LOGIN_SUCCESS,
    //         payload: data
    //       })
    //     })
    //   } else {
    //     // Determine error.
    //     response.json().then(data => {
    //       console.log('response ko data:', data)
    //       dispatch({
    //         type: LOGIN_FAILURE,
    //         payload: data
    //       })
    //     })
    //   }
    // }).chatch(error => {
    //   console.log('Fetch operation failed.')
    //   dispatch({
    //     type: LOGIN_ERROR,
    //     payload: error
    //   })
    // })
  }
}

export function logoutRequest (token) {
  return dispatch => {
    dispatch({
      type: LOGOUT_IN_PROGRESS
    })
    const requestCfg = {
      method: 'post',
      timeout: 3000,
      validateStatus: () => true,
      headers: {
        Authorization: token
      }
    }

    axios(LOGOUT_URL, requestCfg)
      .then(response => {
        if (response.status === 204) {
          dispatch({
            type: LOGOUT_SUCCESS
          })
          // We redirect to the main page.
          browserHistory.push('/main')
        } else if (response.status === 401) {
          dispatch({
            type: LOGOUT_FAILURE,
            payload: response.data.detail
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_ERROR,
          payload: err
        })
      })
  }
}

export function dismissAuthErrorMessage () {
  return {
    type: DISMISS_AUTH_ERROR_MESSAGE
  }
}
