import React, { Component } from 'react'
import { connect } from 'react-redux'

import { prometheusApi } from '../services'

export const metricConnect = connect(state => {
  const {
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

    // UNSAFE_componentWillReceiveProps(nextProps) {}

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
