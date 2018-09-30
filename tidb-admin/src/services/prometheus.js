// in src/services/prometheus.js
import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['crossDomain'] = true
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

// https://prometheus.io/docs/prometheus/latest/querying/api/
const PROMETHEUS_SERVER_HOST = `${process.env.REACT_APP_PROMETHEUS_SERVER ||
  ''}` // pd endpoint host
const PROMETHEUS_API_PREFIX = '/api/v1'

export default function prometheusApi(opt) {
  console.log('API is called with ', opt)
  let { metricType = 'query', metricParams } = opt
  let params
  const prefix = PROMETHEUS_SERVER_HOST + PROMETHEUS_API_PREFIX
  const metricRange = 900

  console.log(metricType)
  console.log(metricParams)

  if (metricType === 'query_range') {
    let end = new Date().getTime() / 1000
    let start = end - metricRange
    params = {
      // _cluster: name,
      // _ns: namespace,
      query: metricParams,
      step: 1,
      start,
      end,
    }
  } else {
    params = {
      query: metricParams,
    }
  }

  const nOpt = Object.assign({}, opt, {
    url: ` ${prefix}/${metricType}`,
    params,
  })

  return axios(nOpt)
    .then(function(response) {
      // success
      console.log('http response', response)
      const { status, data, error } = response
      if (status === 200 && data.data) return data.data.result
      else console.log(error)
    })
    .catch(error => {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
}
