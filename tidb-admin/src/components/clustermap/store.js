import React from 'react'

import _ from 'lodash'
import classNames from 'classnames'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import Button from '@material-ui/core/Button'

const StoreList = ({ stores, classes }) => (
  <GridList cellHeight={270} className={classes.gridList} cols={3}>
    {_.map(stores, item => (
      <Card key={item.store.id} className={classes.card}>
        <Typography
          variant="headline"
          component="h3"
          className={classNames(classes.subHeader, classes.cardTitle)}>
          {`Store: ${item.store.id}`}
        </Typography>
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
            color="primary">
            Status Details
          </Button>
        </CardContent>
      </Card>
    ))}
  </GridList>
)

export default StoreList
