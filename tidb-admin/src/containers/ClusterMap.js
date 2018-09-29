// in src/containers/ClusterMap.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { PDList, StoreList } from '../components/clustermap'

import { theme } from '../actions'

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
  }

  handleChangeTheme() {
    const { dispatch } = this.props
    dispatch(theme.change('dark'))
  }

  render() {
    const { stores, members, theme, classes } = this.props

    const titleCls = {
      variant: 'headline',
      component: 'h2',
      className: classes.cardTitle,
    }

    return (
      <div className={classes.root}>
        <Card className={classes.summary}>
          <Typography {...titleCls}>Cluster Map</Typography>
          <CardContent>
            <p>Admin Theme: {_.upperCase(theme)}</p>
            <p>Lorem ipsum sic dolor amet...</p>
          </CardContent>
        </Card>

        <Card>
          <Typography {...titleCls}>TiDB Servers</Typography>
          <CardContent>TODO...</CardContent>
        </Card>

        <Card>
          <Typography {...titleCls}>PD Servers</Typography>
          <CardContent>
            <PDList members={members} classes={classes} />
          </CardContent>
        </Card>

        <Card>
          <Typography {...titleCls}>TiKV Servers</Typography>
          <CardContent>
            <StoreList stores={stores} classes={classes} />
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
    pdServers: { members, stores },
    globalUI: { theme },
  } = state

  return {
    stores: stores.list,
    members,
    theme,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ClusterMap))
