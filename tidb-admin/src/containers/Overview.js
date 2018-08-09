// in src/containers/Overview.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { ViewTitle } from 'react-admin/lib'

import { stores, store, cluster } from '../actions'

const ClusterStatus = () => <div>Status</div>

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props

    console.log('cluster fetch action', cluster.fetch())
    dispatch(cluster.fetch())
    dispatch(stores.fetch())
    dispatch(store.fetch())
  }

  render() {
    console.log('store', this.props)
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
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  stores: PropTypes.array.isRequired,
  store: PropTypes.object,
  cluster: PropTypes.object,
}

function mapStateToProps(state) {
  const {
    isFetching = false,
    store = null,
    stores = [],
    cluster = null,
  } = state

  return {
    stores,
    isFetching,
    store,
    cluster,
  }
}

export default connect(mapStateToProps)(Overview)
