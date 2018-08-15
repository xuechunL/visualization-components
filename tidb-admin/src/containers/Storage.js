// in src/containers/Storage.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { RegionList, StoreList, RegionsChartList } from '../components/storage'

const styles = {
  summary: {
    marginBottom: '30px',
  },
  gridList: {
    width: '100%',
    transform: 'translateX(-10px)',
  },
  subHeader: {
    paddingLeft: '10px',
    fontSize: '1.2em',
  },
  card: {
    maxWidth: 320,
    margin: 10,
    overflow: 'auto',
  },
  chartCard: {
    maxWidth: '100%',
    margin: '20px 0', 
    // transform: 'translate(-12px, 40px)',
  },
  link: {
    float: 'right',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  cardTitle: {
    padding: '16px 24px',
  },
}

class Storage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({ type: 'FETCH_LABELS' })
    dispatch({ type: 'FETCH_LABELS_STORES' })
    dispatch({ type: 'FETCH_STORES' })
    dispatch({ type: 'FETCH_REGIONS' })
  }

  render() {
    const { stores, regions, classes } = this.props

    const titleCls = {
      variant: 'headline',
      component: 'h2',
      className: classes.cardTitle,
    }

    return (
      <div className={classes.root}>
        <Card className={classes.summary}>
          <Typography {...titleCls}>Storage</Typography>
          <CardContent>Storage Overview...</CardContent>
        </Card>

        <RegionsChartList regions={regions} classes={classes} />

        <StoreList stores={stores} classes={classes} />
        <RegionList regions={regions} classes={classes} />
      </div>
    )
  }
}

Storage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stores: PropTypes.array,
  regions: PropTypes.array,
  theme: PropTypes.string,
}

function mapStateToProps(state) {
  const {
    pdServers: { stores, regions },
  } = state

  return {
    stores: stores.list,
    regions: regions.list,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Storage))
