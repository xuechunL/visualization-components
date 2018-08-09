// in src/services/endpoint.js
import axios from 'axios'

axios.defaults.timeout = 10000
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response
  },
  function(error) {
    if (!error.config.ignoreErrNotice)
      throw new Error(`Request Error:${error.config.url} - ${error.message}`)
    return Promise.reject(error)
  }
)

const PD_ENDPOINT_HOST = 'http://localhost:32379' // pd endpoint port
const PD_ENDPOINT_PATH = '/pd/api/v1'
const URL_PREFIX = PD_ENDPOINT_HOST + PD_ENDPOINT_PATH

export default function API(opt) {
  console.log('API is called with ', opt)
  let { url } = opt
  url = URL_PREFIX + url
  const nOpt = Object.assign({}, opt, { url })

  return axios(nOpt)
}
