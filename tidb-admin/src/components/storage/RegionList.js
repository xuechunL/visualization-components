import React from 'react'

import _ from 'lodash'
import classNames from 'classnames'

// import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Crop54Icon from '@material-ui/icons/Crop54'
import Button from '@material-ui/core/Button'

const RegionList = ({ regions, classes }) => (
  <GridList cellHeight={'auto'} className={classes.gridList} cols={2}>
    <GridListTile key="subHeader" cols={2} style={{ height: 'auto' }}>
      <ListSubheader component="h2" className={classes.subHeader}>
        TiKV Region List
      </ListSubheader>
    </GridListTile>
    {_.map(regions, item => (
      <Card key={item.id} className={classNames(classes.card)}>
        <Typography
          variant="headline"
          component="h3"
          className={classNames(classes.subHeader, classes.cardTitle)}
        >
          {`Region: ${item.id}`}
        </Typography>
        <CardContent>
          {_.map(item, (value, key) => {
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
                      key={`Peer#${v.id}, Store#${v.store_id}`}
                    >
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

          <Button
            href={`#region/${item.id}`}
            className={classes.link}
            color="primary"
          >
            Region Details
          </Button>
        </CardContent>
      </Card>
    ))}
  </GridList>
)

export default RegionList
