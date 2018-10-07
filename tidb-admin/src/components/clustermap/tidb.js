import React from 'react'

import _ from 'lodash'
import classNames from 'classnames'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
// import Button from '@material-ui/core/Button'

const TiDBList = ({ servers, classes }) => (
  <GridList cellHeight={200} className={classes.gridList} cols={3}>
    {_.map(servers, item => {
      return (
        <Card key={item.value[0]} className={classes.card}>
          <Typography
            variant="headline"
            component="h3"
            className={classNames(classes.subHeader, classes.cardTitle)}>
            {`TiDB Instance: ${item.metric.instance}`}
          </Typography>
          <CardContent>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              <li style={{ margin: '16px 0' }}>Job: {item.metric.job}</li>
              <li style={{ margin: '16px 0' }}>
                State: {item.metric.__name__}
              </li>
            </ul>
          </CardContent>
        </Card>
      )
    })}
  </GridList>
)

export default TiDBList
