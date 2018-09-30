// in src/containers/Overview.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _ from 'lodash'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { theme } from '../actions'

import wrapWithPrometheusMetric from '../components/wrapwtihPrometheusMetric'
import { LineChart } from '../components/chart'

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
    // color: '#fff',
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

let DemoChart = wrapWithPrometheusMetric(LineChart)

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChangeTheme = this.handleChangeTheme.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({ type: 'FETCH_CLUSTER_STATUS' })
    dispatch({ type: 'FETCH_STORES' })
  }

  handleChangeTheme() {
    const { dispatch } = this.props
    dispatch(theme.change('dark'))
  }

  render() {
    const { cluster, stores, classes } = this.props
    console.log(stores)
    // if (stores.length) return null

    const titleCls = {
      variant: 'headline',
      component: 'h2',
      className: classes.cardTitle,
    }

    // TODO: abstract and polish capacity and available storage
    // const unit = stores[0].status.capacity.split(' ')[1]
    const sumCapacity = _.sum(
      _.map(stores, s => +s.status.capacity.split(' ')[0])
    )
    const sumAvailable = _.sum(
      _.map(stores, s => +s.status.available.split(' ')[0])
    )

    // TODO: abstract store status

    const storesGroupByState = _.countBy(stores, s => s.store.state_name)
    console.log('stores group by state name', storesGroupByState)

    return (
      <div className={classes.root}>
        <Card className={classes.summary}>
          <Typography {...titleCls}>Overview</Typography>
          <CardContent>
            <ClusterSummary cluster={cluster} />
            {/* <p>Admin Theme: {_.upperCase(theme)}</p> */}
            <p>Lorem ipsum sic dolor amet...</p>
            <DemoChart />
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

Overview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cluster: PropTypes.object,
  theme: PropTypes.string,
}

function mapStateToProps(state) {
  const {
    pdServers: { cluster, stores },
    globalUI: { theme },
  } = state

  return {
    cluster,
    stores: stores.list,
    theme,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Overview))
