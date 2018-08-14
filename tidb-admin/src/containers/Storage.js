// in src/containers/Storage.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import GridList from '@material-ui/core/GridList'
import { ViewTitle } from 'react-admin/lib'
import Button from '@material-ui/core/Button'

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
  card: {
    maxWidth: 320,
    margin: 10,
  },
  link: {
    float: 'right',
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
    dispatch({ type: 'FETCH_REGION_BY_ID', payload: { id: 2 } })
  }

  render() {
    const { stores, classes } = this.props

    return (
      <div className={classes.root}>
        <Card className={classes.summary}>
          <ViewTitle title="Storage" />
          <CardContent>TiKV Store List...</CardContent>
        </Card>
        <GridList cellHeight={260} className={classes.gridList} cols={3}>
          {_.map(stores, item => (
            <Card key={item.store.id} className={classes.card}>
              <ViewTitle title={`Store: ${item.store.id}`} />
              <CardContent>
                {_.map(item.store, (value, key) => {
                  return (
                    <p key={`${key}-${value}`}>
                      {_.startCase(key)}: {value}
                    </p>
                  )
                })}
                <Button
                  href={`#store/${item.store.id}`}
                  className={classes.link}
                  color="primary"
                >
                  Status Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </GridList>
      </div>
    )
  }
}

Storage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stores: PropTypes.array,
  theme: PropTypes.string,
}

function mapStateToProps(state) {
  const {
    pdServers: { stores },
  } = state

  return {
    stores: stores.list,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Storage))
