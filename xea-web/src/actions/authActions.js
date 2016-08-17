import { LOGIN_URL, VERIFY_URL, LOGOUT_URL, LOGOUT_ALL_URL } from '../constants/urls'

function goFetchToken() {
  if (window.fetch) {

  } else {

  }
}

export function loginRequest ({ email, password }) {
  console.log(`email: ${email}, password: ${password}`)
  return dispatch =>{
    // Basic authorization hash <- base64 username(=email):password
    const hash = window.btoa(`${email}:${password}`)
    // We need to build our headers
    const headers = new window.Headers({
      Authorization: `Basic ${hash}`
    })
    const fetcCfg = {
      method: 'post',
      headers
    }
    window.fetch(LOGIN_URL, fetchCfg).then(respose => {
        if (respose.ok) {
          // Save token, change client state.
          respose.json().then(data => console.log('response ok data:', data))
        } else {
          // Determine error.
          respose.json().then(data => console.log('response ko data:', data))
        }
      }
    ).chatch( error => console.log('Fetch operation failed.'))
  }
}

export function logoutResquest () {
  console.log('logot requested')
}
