// in src/authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin'

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    // TODO: use auth api
    // const { username, password } = params
    // const request = new Request('/api/authenticate', {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password }),
    //   headers: new Headers({ 'Content-Type': 'application/json' }),
    // })
    // return fetch(request)
    //   .then(response => {
    //     if (response.status < 200 || response.status >= 300) {
    //       throw new Error(response.statusText)
    //     }
    //     return response.json()
    //   })
    //   .then(({ token }) => {
    //     localStorage.setItem('tidb_admin_token', token)
    //   })
    return localStorage.setItem('tidb_admin_token', params.username)
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('tidb_admin_token')
    return Promise.resolve()
  }

  if (type === AUTH_ERROR) {
    const status = params.status
    if (status === 401 || status === 403) {
      localStorage.removeItem('tidb_admin_token')
      return Promise.reject()
    }
    return Promise.resolve()
  }

  if (type === AUTH_CHECK) {
    return localStorage.getItem('tidb_admin_token')
      ? Promise.resolve()
      : Promise.reject()
  }

  return Promise.reject('Unknown method')
}
