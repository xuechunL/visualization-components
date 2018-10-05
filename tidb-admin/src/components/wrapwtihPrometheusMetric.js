import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import { prometheusApi } from '../services'

export const metricConnect = connect(state => {
  const {
    globalUI: { theme },
    pdServers: { metrics },
  } = state
  return {
    theme,
    qpsMetric: metrics.tidb_server_query_totals,
    connMetric: metrics.tidb_server_connections,
  }
})

// let metricTimer
// const period = 60 * 1000

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
      // const {
      //   metric: {
      //     metricParams = 'tidb_server_query_totals',
      //     metricType = 'query_range',
      //   },
      // } = this.props
    }

    componentWillUnmount() {
      // metricTimer = clearInterval(metricTimer)
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {}

    // getMetricsData(metric) {
    //   const {
    //     metricParams = 'tidb_server_query_totals',
    //     metricType = 'query_range',
    //   } = metric
    // }

    // shouldComponentUpdate(nextProps, nextState) {}

    render() {
      const { metricName } = this.props

      console.log('metric type', this.props.metricName)
      // TODO: multi tidb cluster
      return (
        <div className="metric-wrapper">
          <WrappedComponent metric={this.props.metrics[metricName]} />
        </div>
      )
    }
  }

  WC.propTypes = {
    metrics: PropTypes.object,
    metricName: PropTypes.string,
  }

  return WC
}

export default wrapWithPrometheusMetric
