import React, { Component } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'

import { prometheusApi } from '../services'

const filters = {
  humanBite(val) {
    return Math.ceil(val / 1024 / 1024)
  },
}

class _MetricsChart extends Component {
  shouldComponentUpdate() {
    return true
  }

  render() {
    const { data = [null, 101101], filter } = this.props
    let value = 0
    if (data && data.length) {
      value = _.isNumber(_.last(data)) ? _.last(data) : _.last(data)[1] // data[0] is timestamp
    }
    if (filter) {
      value = filters[filter](value)
    }
    return <span>{value}</span>
  }
}

export const metricConnect = connect(state => {
  const {
    // pdServers: { cluster, stores },
    globalUI: { theme },
  } = state
  return {
    theme,
  }
})

const wrapWithPrometheusMetric = WrappedComponent => {
  class WC extends Component {
    constructor(props) {
      super(props)

      this.state = {
        isUpdated: false,
        // promExp,
        data: [],
      }
    }

    componentDidMount() {
      let {
        metricParams = 'tidb_server_query_totals',
        metricType = 'query_range',
      } = this.props
      prometheusApi({ metricType, metricParams })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {}

    shouldComponentUpdate(nextProps, nextState) {
      return nextState.isUpdated
    }

    render() {
      return (
        <div className="metric-wrapper">
          <WrappedComponent />
        </div>
      )
    }
  }
  return WC
}
export default wrapWithPrometheusMetric

export const MetricsChart = metricConnect(
  wrapWithPrometheusMetric(_MetricsChart)
)
