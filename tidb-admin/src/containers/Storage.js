// in src/containers/Storage.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import GridList from '@material-ui/core/GridList'
// import Button from '@material-ui/core/Button'
import { ViewTitle } from 'react-admin/lib'
import Button from '@material-ui/core/Button'

const styles = {
  summary: {
    marginBottom: '20px',
  },
  gridList: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px',
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

    dispatch({ type: 'FETCH_STORES' })
    dispatch({ type: 'FETCH_STORE', payload: { id: 1 } })
  }

  render() {
    const { stores, classes } = this.props

    console.log('stores', stores)
    return (
      <div className={classes.root}>
        <Card className={classes.summary}>
          <ViewTitle title="Storage" />
          <CardContent>TiKV Store List...</CardContent>
        </Card>
        <GridList cellHeight={240} className={classes.gridList} cols={3}>
          {stores.map(item => (
            <Card key={item.store.id} className={classes.card}>
              <ViewTitle title={`Store: ${item.store.id}`} />
              <CardContent>
                <p>Address: {item.store.address} </p>
                <p>Version: {item.store.version}</p>
                <p>State: {item.store.state_name}</p>
                <Button
                  href="#text-buttons"
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
  store: PropTypes.object,
  cluster: PropTypes.object,
  theme: PropTypes.string,
}

function mapStateToProps(state) {
  const {
    pdServers: { stores, store },
  } = state

  return {
    stores: stores.list,
    store,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Storage))
