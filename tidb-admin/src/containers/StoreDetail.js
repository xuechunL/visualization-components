// in src/containers/Store.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _ from 'lodash'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { ViewTitle } from 'react-admin/lib'

const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    marginBottom: '30px',
  },
  summary: {},
  status: {},
  metrics: {},
}

class StoreDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: window.location.href.slice(-1),
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { id } = this.state

    dispatch({ type: 'FETCH_STORE', payload: { id } })
  }

  render() {
    if (_.isNull(this.props.store)) return null

    const {
      store: { store, status },
      classes,
    } = this.props

    const cls = spc => classNames(classes.card, ...spc)

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6} sm={6}>
            <Card className={cls([classes.summary])}>
              <ViewTitle title={`Store: ${store.id}`} />
              <CardContent>
                {_.map(store, (value, key) => {
                  return (
                    <p key={`${key}-${value}`}>
                      {_.startCase(key)}: {value}
                    </p>
                  )
                })}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Card className={cls([classes.status])}>
              <ViewTitle title="Store Status" />
              <CardContent>
                {_.map(status, (value, key) => {
                  return (
                    <p key={`${key}-${value}`}>
                      {_.startCase(key)}: {value}
                    </p>
                  )
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

StoreDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.object,
  theme: PropTypes.string,
}

function mapStateToProps(state) {
  const {
    pdServers: { stores },
  } = state

  return {
    store: stores.store,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(StoreDetail))
