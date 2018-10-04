// in src/services/endpoints.js
import axios from 'axios'
// import _ from 'lodash'

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

// PD API
// export environment variables with create-react-app
// https://serverless-stack.com/chapters/environments-in-create-react-app.html
const PD_ENDPOINT = `http://localhost:${process.env.REACT_APP_PD_PORT ||
  '2379'}` // pd endpoint
const PD_API_PREFIX = '/pd/api/v1'

export function pdApi(opt) {
  console.log('PD API is called with ', opt)
  let { path } = opt

  let prefix = PD_ENDPOINT + PD_API_PREFIX

  const nOpt = Object.assign({}, opt, {
    url: prefix + path,
  })

  return axios(nOpt)
    .then(function(response) {
      // success
      // console.log('http response', response)
      // TODO: abstract status code handler
      const { status, data, error } = response
      if (status === 200 || status === 201 || status === 202 || status === 204)
        return data
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

// TODO: TiDB API
const TIDB_ENDPOINT = 'http://localhost:10080' // tidb endpoints
// const TIDB_API_PREFIX = '/pd/api/v1'

export function tidbApi(opt) {
  console.log('TiDB API is called with ', opt)
  let { path } = opt

  let prefix = TIDB_ENDPOINT

  const nOpt = Object.assign({}, opt, {
    url: prefix + path,
  })

  return axios(nOpt)
    .then(function(response) {
      // success
      // console.log('http response', response)
      // TODO: abstract status code handler
      const { status, data, error } = response
      if (status === 200 || status === 201 || status === 202 || status === 204)
        return data
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

// Prometheus API
// https://prometheus.io/docs/prometheus/latest/querying/api/
const PROMETHEUS_ENDPOINT = 'http://localhost:9090' // prometheus endpoints
const PROMETHEUS_API_PREFIX = '/api/v1'

export function prometheusApi(opt) {
  console.log('Prometheus API is called with ', opt)
  let {
    metricType = 'query',
    metricParams,
    // metricLabelFormat = '{{type}}',
  } = opt
  let params
  const prefix = PROMETHEUS_ENDPOINT + PROMETHEUS_API_PREFIX
  const metricRange = 100

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
      // console.log('http response', response)
      const { status, data, error } = response
      // TODO: abstract response handler
      if (status === 200 && data.data) {
        if (metricType === 'query') return data.data.result
        // let labelList = []
        // let valueList = []
        // data.data.result.forEach(i => {
        //   console.log(i)
        //   labelList.push(i.metric)
        //   valueList.push(i.values)
        // })

        // valueList.labels = labelList

        // console.log('value list', valueList)
        // console.log('label list', labelList)
        // TODO: process values
        const valueList = data.data.result
        return valueList
      } else console.log(error)
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
