// in src/containers/Overview.js
import React from 'react'

import { connect } from 'react-redux'

import _ from 'lodash'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { theme } from '../actions'

import wrapWithPrometheusMetric, {
  metricConnect,
} from '../components/wrapwtihPrometheusMetric'
import { LineChart } from '../components/chart'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    width: 360,
    margin: 10,
  },
  metricsCard: {
    // maxWidth: 360,
  },
  cardTitle: {
    padding: '16px 24px',
  },
  label: {
    display: 'inline-block',
    padding: '2px 12px',
    color: '#00C853',
  },
  abnormal: {
    color: '#D50000',
  },
}

// const ClusterSummary = ({ cluster }) => {
//   // TODO: loading
//   if (_.isNull(cluster.status)) return null
//   return <div>Raft Bootstrap Time: {cluster.status.raft_bootstrap_time}</div>
// }

// let QPSChart = metricConnect(wrapWithPrometheusMetric(SparklineChart))
// let ConnectionsChart = metricConnect(wrapWithPrometheusMetric(SparklineChart))
let ConnLineChart = metricConnect(wrapWithPrometheusMetric(LineChart))
let QPSLineChart = metricConnect(wrapWithPrometheusMetric(LineChart))

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChangeTheme = this.handleChangeTheme.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props

    const qpsMetric = {
      metricParams: 'tidb_server_query_totals',
      metricType: 'query_range',
    }

    const connectMetric = {
      metricParams: 'tidb_server_connections',
      metricType: 'query_range',
    }

    dispatch({ type: 'FETCH_CLUSTER_STATUS' })
    dispatch({ type: 'FETCH_STORES' })
    dispatch({ type: 'FETCH_METRICS', payload: { metric: qpsMetric } })
    dispatch({ type: 'FETCH_METRICS', payload: { metric: connectMetric } })
  }

  handleChangeTheme() {
    const { dispatch } = this.props
    dispatch(theme.change('dark'))
  }

  render() {
    const { stores, classes, metrics } = this.props
    // console.log(stores)

    const titleCls = {
      variant: 'headline',
      component: 'h2',
      className: classes.cardTitle,
    }

    // TODO: abstract and polish capacity and available storage
    const sumCapacity = _.sum(
      _.map(stores, s => +s.status.capacity.split(' ')[0])
    )
    const sumAvailable = _.sum(
      _.map(stores, s => +s.status.available.split(' ')[0])
    )

    // TODO: abstract store status
    const storesGroupByState = _.countBy(stores, s => s.store.state_name)
    // console.log('stores group by state name', storesGroupByState)

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <Typography {...titleCls}>QPS</Typography>
          <CardContent>
            <QPSLineChart
              metrics={metrics}
              metricName="tidb_server_query_totals"
            />
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <Typography {...titleCls}>Connection Count</Typography>
          <CardContent>
            <ConnLineChart
              metrics={metrics}
              metricName="tidb_server_connections"
            />
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <Typography {...titleCls}>Stores Storage</Typography>
          <CardContent>
            Storage Capacity: {sumCapacity}{' '}
            {stores[0] && stores[0].status.capacity.split(' ')[1]}
          </CardContent>
          <CardContent>
            Current Storage Size: {sumCapacity - sumAvailable}{' '}
            {stores[0] && stores[0].status.capacity.split(' ')[1]}
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <Typography {...titleCls}>Stores Status</Typography>
          <CardContent>
            <ul>
              <li className={classes.stateUp}>
                Up Stores:{' '}
                <span
                  className={classNames(classes.label)}
                  data-count={storesGroupByState['Up'] || 0}>
                  {storesGroupByState['Up'] || 0}
                </span>
              </li>
              <li className={classes.disconnect}>
                Disconnect Stores:
                <span
                  className={classNames(classes.label, classes.abnormal)}
                  data-count={storesGroupByState['Disconnect'] || 0}>
                  {storesGroupByState['Disconnect'] || 0}
                </span>
              </li>
              <li className={classes.lowSpace}>
                LowSapce Stores:
                <span
                  className={classNames(classes.label, classes.abnormal)}
                  data-count={storesGroupByState['LowSpace'] || 0}>
                  {storesGroupByState['LowSpace'] || 0}
                </span>
              </li>
              <li className={classes.down}>
                Down Stores:
                <span
                  className={classNames(classes.label, classes.abnormal)}
                  data-count={storesGroupByState['Down'] || 0}>
                  {storesGroupByState['Down'] || 0}
                </span>
              </li>
              <li className={classes.offline}>
                Offline Stores:
                <span
                  className={classNames(classes.label, classes.abnormal)}
                  data-count={storesGroupByState['Offline'] || 0}>
                  {storesGroupByState['Offline'] || 0}
                </span>
              </li>
              <li className={classes.tombstone}>
                Tombstone Stores:
                <span
                  className={classNames(classes.label)}
                  data-count={storesGroupByState['Tombstone'] || 0}>
                  {storesGroupByState['Tombstone'] || 0}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    pdServers: { stores, metrics },
    globalUI: { theme },
  } = state

  return {
    theme,
    metrics,
    stores: stores.list,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Overview))
