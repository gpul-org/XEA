const urlconf = require('./urlconf')

let instance

export default class URL {
  constructor (mode = 'dev') {
    if (!instance) {
      instance = this
      this.host = urlconf[mode].host
      this.port = urlconf[mode].port
    }

    return instance
  }

  baseUrl () {
    return `http://${this.host}:${this.port}`
  }

  login () {
    return `${this.baseUrl()}/api/auth/jwt/get_token`
  }

  logout () {
    return `${this.baseUrl()}/api/auth/jwt/logout`
  }

  verify () {
    return `${this.baseUrl()}/api/auth/jwt/verify_token`
  }

  logoutAll () {
    return `${this.baseUrl()}/api/auth/jwt/logout_all`
  }
}

// export const LOGIN_URL = 'http://localhost:8000/api/auth/jwt/get_token'
// export const VERIFY_URL = 'http://localhost:8000/api/auth/jwt/verfy_token'
// export const LOGOUT_URL = 'http://localhost:8000/api/auth/jwt/logout'
// export const LOGOUT_ALL_URL = 'http://localhost:8000/api/auth/jwt/logout_all'
