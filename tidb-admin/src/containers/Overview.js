// in src/containers/Overview.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

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
}

const ClusterSummary = ({ cluster }) => {
  // TODO: loading
  if (_.isNull(cluster.status)) return null
  return <div>Raft Bootstrap Time: {cluster.status.raft_bootstrap_time}</div>
}

class Overview extends React.Component {
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

    const titleCls = {
      variant: 'headline',
      component: 'h2',
      className: classes.cardTitle,
    }

    return (
      <div className={classes.root}>
        <Card className={classes.summary}>
          <Typography {...titleCls}>TiDB Dashboard</Typography>
          <CardContent>
            <p>Admin Theme: {_.upperCase(theme)}</p>
            <p>Lorem ipsum sic dolor amet...</p>
          </CardContent>
        </Card>

        <Card>
          <Typography {...titleCls}>Cluster Status</Typography>
          <CardContent>
            <ClusterSummary cluster={cluster} />
            {/* <Button
              variant="outlined"
              color="primary"
              onClick={this.handleChangeTheme}
            >
              DarK
            </Button> */}
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
    pdServers: { cluster },
    globalUI: { theme },
  } = state

  return {
    cluster,
    theme,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Overview))
