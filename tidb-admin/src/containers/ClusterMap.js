// in src/containers/ClusterMap.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _ from 'lodash'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { ViewTitle } from 'react-admin/lib'

import { theme } from '../actions'

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
    dispatch({ type: 'FETCH_STORES' })
    dispatch({ type: 'FETCH_STORE', payload: { id: 1 } })
  }

  handleChangeTheme() {
    const { dispatch } = this.props
    dispatch(theme.change('dark'))
  }

  render() {
    const { cluster, theme } = this.props

    console.log('cluster', cluster)
    return (
      <div>
        <Card>
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
  stores: PropTypes.object,
  store: PropTypes.object,
  cluster: PropTypes.object,
  theme: PropTypes.string,
}

function mapStateToProps(state) {
  const {
    pdServers: { stores, store, cluster },
    globalUI: { theme },
  } = state

  return {
    stores,
    store,
    cluster,
    theme,
  }
}

export default connect(mapStateToProps)(ClusterMap)
