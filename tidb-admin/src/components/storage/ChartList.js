import React from 'react'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'

import { RegionsTreeMap, RegionsWriteFlow } from './index'

const ChartList = ({ regions, classes }) => (
  <GridList cellHeight={'auto'} cols={2}>
    <GridListTile key="subHeader" cols={2} style={{ height: 'auto' }}>
      <ListSubheader component="h2" className={classes.subHeader}>
        TiKV Region List
      </ListSubheader>
    </GridListTile>
    <RegionsTreeMap regions={regions} classes={classes} />
    <RegionsWriteFlow regions={regions} classes={classes} />
  </GridList>
)

export default ChartList
