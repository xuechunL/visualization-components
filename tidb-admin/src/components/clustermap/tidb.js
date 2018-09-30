import React from 'react'

import _ from 'lodash'
// import classNames from 'classnames'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
// import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
// import Button from '@material-ui/core/Button'

const TiDBList = ({ servers, classes }) => (
  <GridList cellHeight={240} className={classes.gridList} cols={3}>
    {_.map(servers, item => {
      return (
        <Card key={item.value[0]} className={classes.card}>
          <CardContent>
            <ul>
              <li>Instance: {item.metric.instance}</li>
              <li>Job: {item.metric.job}</li>
              <li>State: {item.metric.__name__}</li>
            </ul>
          </CardContent>
        </Card>
      )
    })}
  </GridList>
)

export default TiDBList
