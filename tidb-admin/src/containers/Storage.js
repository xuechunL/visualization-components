// in src/containers/Storage.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { ViewTitle } from 'react-admin/lib'

import { RegionList, StoreList } from '../components/storage'

const styles = {
  summary: {
    marginBottom: '30px',
  },
  gridList: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    transform: 'translateX(-10px)',
  },
  subheader: {
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
    transform: 'translate(-10px, 40px)',
  },
  link: {
    float: 'right',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
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
    // dispatch({ type: 'FETCH_REGION_BY_ID', payload: { id: 2 } })
  }

  render() {
    const { stores, regions, classes } = this.props

    return (
      <div className={classes.root}>
        <Card className={classes.summary}>
          <ViewTitle title="Storage" />
          <CardContent>Storage Overview...</CardContent>
        </Card>

        <StoreList stores={stores} classes={classes} />
        <RegionList regions={regions} classes={classes} />

        <Card className={classNames(classes.card, classes.chartCard)}>
          <ViewTitle title="Regions With The Highest Write Flow." />
          <CardContent>Write Flow ScanKey Diagram...</CardContent>
        </Card>
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
