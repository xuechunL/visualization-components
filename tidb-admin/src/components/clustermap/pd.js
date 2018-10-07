import React from 'react'

import _ from 'lodash'
import classNames from 'classnames'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import Button from '@material-ui/core/Button'

const PDRole = ({ classes }) => (
  <Typography
    variant="headline"
    component="h3"
    className={classNames(classes.subHeader)}
    color="primary">
    PD Role: Leader
  </Typography>
)

const PDList = ({ members, classes }) => (
  <GridList cellHeight={270} className={classes.gridList} cols={3}>
    {_.map(members.list, item => {
      const { leader } = members
      return (
        <Card key={item.member_id} className={classes.card}>
          <CardContent>
            {item.member_id === leader.member_id && (
              <PDRole classes={classes} />
            )}
            {_.map(item, (value, key) => (
              <p key={`${key}-${value}`}>
                {_.startCase(key)}: {value}
              </p>
            ))}
            <Button
              href={`/pd/${item.member_id}`}
              className={classes.link}
              color="primary">
              Status Details
            </Button>
          </CardContent>
        </Card>
      )
    })}
  </GridList>
)

export default PDList
