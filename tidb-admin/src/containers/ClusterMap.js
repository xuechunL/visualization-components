// in src/containers/ClusterMap.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { ViewTitle } from 'react-admin/lib'

import { theme } from '../actions'

const styles = {
  summary: {
    marginBottom: '30px',
  },
  card: {
    maxWidth: 320,
    margin: 10,
  },
}

const ClusterSummary = ({ cluster }) => {
  // TODO: loading
  if (_.isNull(cluster.status)) return null
  return <div>Raft Bootstrap Time: {cluster.status.raft_bootstrap_time}</div>
}

class ClusterMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChangeTheme = this.handleChangeTheme.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({ type: 'FETCH_CLUSTER_STATUS' })
  }

  handleChangeTheme() {
    const { dispatch } = this.props
    dispatch(theme.change('dark'))
  }

  render() {
    const { cluster, theme, classes } = this.props

    return (
      <div className={classes.root}>
        <Card className={classes.summary}>
          <ViewTitle title="Cluster Map" />
          <CardContent>
            Admin Theme: {_.upperCase(theme)}
            <br /> Lorem ipsum sic dolor amet...
          </CardContent>
        </Card>

        <Card>
          <ViewTitle title="Cluster Status" />
          <CardContent>
            <ClusterSummary cluster={cluster} />
          </CardContent>
        </Card>
      </div>
    )
  }
}

ClusterMap.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cluster: PropTypes.object,
  theme: PropTypes.string,
}

function mapStateToProps(state) {
  const {
    pdServers: { cluster },
    globalUI: { theme },
  } = state

  return {
    cluster,
    theme,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ClusterMap))
