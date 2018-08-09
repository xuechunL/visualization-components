// in src/containers/Overview.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { ViewTitle } from 'react-admin/lib'

const ClusterStatus = () => {
  return <div>Status</div>
}

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({ type: 'FETCH_CLUSTER_STATUS' })
    dispatch({ type: 'FETCH_STORES' })
    // dispatch({ type: 'FETCH_STORE', payload: { id: 1 } })
  }

  render() {
    console.log('global state in overview container', this.props)
    return (
      <div>
        <Card>
          <ViewTitle title="Welcome to the TiDB Dashboard" />
          <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        </Card>

        <Card>
          <ViewTitle title="Cluster Status" />
          <CardContent>
            <ClusterStatus />
          </CardContent>
        </Card>
      </div>
    )
  }
}

Overview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stores: PropTypes.object,
  store: PropTypes.object,
  cluster: PropTypes.object,
}

function mapStateToProps(state) {
  const {
    pdServers: { stores, store, cluster },
  } = state

  return {
    stores,
    store,
    cluster,
  }
}

export default connect(mapStateToProps)(Overview)
