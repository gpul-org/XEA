import axios from 'axios'

import { LOGIN_URL, VERIFY_URL, LOGOUT_URL, LOGOUT_ALL_URL } from '../constants/urls'
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_ERROR,
  LOGOUT_SUCCESS
} from '../constants/actionTypes'

export function loginRequest ({ username, password }) {
  console.log(`(login requested) username: ${username}, password: ${password}`)
  return dispatch => {
    const requestCfg = {
      method: 'post',
      timeout: 3000,
      auth: {
        username,
        password
      },
      validStatus: () => true
    }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: 'yesss!'
    })
    // axios(LOGIN_URL, requestCfg)
    //   .then(response => {
    //     console.log('response:', response)
    //     // TODO: Check status and dispatch appropriate action.
    //     if (response.status === 200) {
    //       dispatch({
    //         type: LOGIN_SUCCESS,
    //         payload: response.data.token
    //       })
    //     } else {
    //       dispatch({
    //         type: LOGIN_FAILURE,
    //         payload: response
    //       })
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     dispatch({
    //       type: LOGIN_ERROR,
    //       payload: error
    //     })
    //   })

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

export function logoutRequest () {
  console.log('logot requested')
  return dispatch => {
    dispatch({
      type: LOGOUT_SUCCESS
    })
  }
}
