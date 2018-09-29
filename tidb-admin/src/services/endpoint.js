// in src/services/endpoint.js
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

// export environment variables with create-react-app
// https://serverless-stack.com/chapters/environments-in-create-react-app.html
const PD_ENDPOINT_HOST = `${process.env.REACT_APP_PD_SEVER || ''}` // pd endpoint host
const PD_API_PREFIX = '/pd/api/v1'
const URL_PREFIX = PD_ENDPOINT_HOST + PD_API_PREFIX

// FIXME: CORS https://github.com/axios/axios/issues/853
// CORS Chrome extensions: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

export default function API(opt) {
  console.log('API is called with ', opt)
  let { url } = opt
  url = URL_PREFIX + url
  const nOpt = Object.assign({}, opt, {
    url,
  })

  return axios(nOpt)
    .then(function(response) {
      // success
      console.log('http response', response)
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
