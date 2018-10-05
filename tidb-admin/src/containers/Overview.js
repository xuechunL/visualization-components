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
import { SparklineChart, LineChart } from '../components/chart'

const styles = {
  summary: {
    marginBottom: '30px',
  },
  card: {
    maxWidth: 320,
    margin: 10,
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

const ClusterSummary = ({ cluster }) => {
  // TODO: loading
  if (_.isNull(cluster.status)) return null
  return <div>Raft Bootstrap Time: {cluster.status.raft_bootstrap_time}</div>
}

let QPSChart = metricConnect(wrapWithPrometheusMetric(SparklineChart))
let ConnectionsChart = metricConnect(wrapWithPrometheusMetric(SparklineChart))
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
    // TODO: move to one interval async function
    dispatch({ type: 'FETCH_METRICS', payload: { metric: qpsMetric } })
    dispatch({ type: 'FETCH_METRICS', payload: { metric: connectMetric } })
  }

  handleChangeTheme() {
    const { dispatch } = this.props
    dispatch(theme.change('dark'))
  }

  render() {
    const { cluster, stores, classes, metrics } = this.props
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
        <Card className={classes.summary}>
          <Typography {...titleCls}>Overview</Typography>
          <CardContent>
            <ClusterSummary cluster={cluster} />
            <QPSChart metrics={metrics} metricName="tidb_server_query_totals" />
            <ConnectionsChart
              metrics={metrics}
              metricName="tidb_server_connections"
            />
            <QPSLineChart
              metrics={metrics}
              metricName="tidb_server_query_totals"
            />
            <ConnLineChart
              metrics={metrics}
              metricName="tidb_server_connections"
            />
          </CardContent>
        </Card>

        <Card>
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

        <Card>
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
    pdServers: { cluster, stores, metrics },
    globalUI: { theme },
  } = state

  return {
    theme,
    cluster,
    metrics,
    // qpsMetric: metrics.tidb_server_query_totals,
    // connMetric: metrics.tidb_server_connections,
    stores: stores.list,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Overview))
