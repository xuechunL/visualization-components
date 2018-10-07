// in src/containers/ClusterMap.js
import React from 'react'
import { connect } from 'react-redux'

// import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { PDList, StoreList, TiDBList } from '../components/clustermap'

import { theme } from '../actions'

const styles = {
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    width: 320,
    margin: 10,
  },
  cardTitle: {
    padding: '16px 24px',
  },
  link: {
    float: 'right',
  },
}

class ClusterMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChangeTheme = this.handleChangeTheme.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({ type: 'FETCH_MEMBERS' })
    dispatch({ type: 'FETCH_STORES' })
    // TODO: TiDB Servers
    dispatch({ type: 'FETCH_TIDB_SERVERS' })
  }

  handleChangeTheme() {
    const { dispatch } = this.props
    dispatch(theme.change('dark'))
  }

  render() {
    const { stores, members, tidbServers, classes } = this.props

    const titleCls = {
      variant: 'headline',
      component: 'h2',
      className: classes.cardTitle,
    }

    return (
      <div>
        <div className={classes.section}>
          <Typography {...titleCls}>TiDB Servers</Typography>
          <TiDBList servers={tidbServers} classes={classes} />
        </div>
        <div className={classes.section}>
          <Typography {...titleCls}>PD Servers</Typography>
          <PDList members={members} classes={classes} />
        </div>
        <div className={classes.section}>
          <Typography {...titleCls}>TiKV Servers</Typography>
          <StoreList stores={stores} classes={classes} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    pdServers: { members, stores, cluster },
    globalUI: { theme },
  } = state

  return {
    tidbServers: cluster.tidbServers,
    stores: stores.list,
    members,
    theme,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ClusterMap))
