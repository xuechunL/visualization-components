// in src/containers/Storage.js
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { ViewTitle } from 'react-admin/lib'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Crop54Icon from '@material-ui/icons/Crop54'

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
  link: {
    float: 'right',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
}

const StoreList = ({ stores, classes }) => (
  <GridList cellHeight={260} className={classes.gridList} cols={3}>
    <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
      <ListSubheader component="h2" className={classes.subheader}>
        TiKV Store List
      </ListSubheader>
    </GridListTile>
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
)

const RegionList = ({ regions, classes }) => (
  <GridList cellHeight={'auto'} className={classes.gridList} cols={3}>
    <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
      <ListSubheader component="h2" className={classes.subheader}>
        TiKV Region List
      </ListSubheader>
    </GridListTile>
    {_.map(regions, item => (
      <Card key={item.id} className={classes.card}>
        <ViewTitle title={`Region: ${item.id}`} />
        <CardContent>
          {_.map(item, (value, key) => {
            console.log(value)
            console.log(_.isObject(value))
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
                <div
                  key={`peers-${value[0].id}-${value[0].store_id}`}
                  className={classes.row}
                >
                  Peers:
                  {_.map(value, v => (
                    <Tooltip title={`Peer#${v.id}, Store#${v.store_id}`}>
                      <IconButton
                        aria-label={`Peer#${v.id}, Store#${v.store_id}`}
                      >
                        <Crop54Icon />
                      </IconButton>
                    </Tooltip>
                  ))}
                </div>
              )
          })}
        </CardContent>
      </Card>
    ))}
  </GridList>
)

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
