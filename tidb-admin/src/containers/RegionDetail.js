// in src/containers/region.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _ from 'lodash'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Crop54Icon from '@material-ui/icons/Crop54'

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
  cardTitle: {
    padding: '16px 24px',
  },
}

// TODO: use HOC to abstract detial container
// TODO: abstract Region Card

class RegionDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: _.last(window.location.href.split('/')),
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { id } = this.state

    dispatch({ type: 'FETCH_REGION_BY_ID', payload: { id } })
  }

  render() {
    if (_.isNull(this.props.region)) return null

    const { region, classes } = this.props

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Card key={region.id} className={classNames(classes.card)}>
            <Typography
              variant="headline"
              component="h3"
              className={classNames(classes.subHeader, classes.cardTitle)}>
              {`Region: ${region.id}`}
            </Typography>
            <CardContent>
              {_.map(region, (value, key) => {
                if (!_.isObject(value))
                  return (
                    <p key={`${key}-${value}`}>
                      {_.startCase(key)}: {value}
                    </p>
                  )
                if (key === 'epoch')
                  return (
                    <p key={`epoch-${value.conf_ver}-${value.version}`}>
                      {_.startCase('conf_ver')}: {value.conf_ver},{' '}
                      {_.startCase('version')}: {value.version}
                    </p>
                  )
                if (key === 'peers')
                  return (
                    <div key={`peers-${value[0].id}`} className={classes.row}>
                      Peers:
                      {_.map(value, v => (
                        <Tooltip
                          title={`Peer#${v.id}, Store#${v.store_id}`}
                          key={`Peer#${v.id}, Store#${v.store_id}`}>
                          <IconButton
                            aria-label={`Peer#${v.id}, Store#${v.store_id}`}>
                            <Crop54Icon />
                          </IconButton>
                        </Tooltip>
                      ))}
                    </div>
                  )
              })}
            </CardContent>
          </Card>
        </Grid>
      </div>
    )
  }
}

RegionDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  region: PropTypes.object,
  theme: PropTypes.string,
}

function mapStateToProps(state) {
  const {
    pdServers: { regions },
  } = state

  return {
    region: regions.region,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(RegionDetail))
