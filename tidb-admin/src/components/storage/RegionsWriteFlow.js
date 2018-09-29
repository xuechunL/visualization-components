import React from 'react'

// import _ from 'lodash'
import classNames from 'classnames'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { Sankey, Hint } from 'react-vis'

// mock data
import * as DataFlow from './flow.json'

const BLURRED_LINK_OPACITY = 0.3
const FOCUSED_LINK_OPACITY = 0.6

const nodes = [{ name: 'store#1' }, { name: 'store#4' }, { name: 'store#5' }]
const links = [
  { source: 0, target: 1, value: 100 },
  { source: 0, target: 2, value: 200 },
  { source: 1, target: 2, value: 200 },
]

const styles = {
  button: {
    margin: '10px 0',
  },
  flexedControls: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    width: '75%',
    margin: 'auto',
  },
}

const MODE = ['justify', 'center', 'left', 'right']

export default class RegionsWriteFlow extends React.Component {
  state = {
    modeIndex: 0,
    activeLink: null,
  }

  updateModeIndex = increment => () => {
    const newIndex = this.state.modeIndex + (increment ? 1 : -1)
    const modeIndex =
      newIndex < 0 ? MODE.length - 1 : newIndex >= MODE.length ? 0 : newIndex
    this.setState({ modeIndex })
  }

  renderHint() {
    const { activeLink } = this.state

    // calculate center x,y position of link for positioning of hint
    const x =
      activeLink.source.x1 + (activeLink.target.x0 - activeLink.source.x1) / 2
    const y = activeLink.y0 - (activeLink.y0 - activeLink.y1) / 2

    const hintValue = {
      [`${activeLink.source.name} ➞ ${
        activeLink.target.name
      }`]: activeLink.value,
    }

    return <Hint x={x} y={y} value={hintValue} />
  }

  render() {
    const { classes } = this.props
    const { modeIndex, activeLink } = this.state

    const btnProps = {
      variant: 'outlined',
      color: 'primary',
      style: styles.button,
    }

    return (
      <Card className={classes.chartCard}>
        <Typography
          variant="headline"
          component="h2"
          className={classNames(classes.subHeader, classes.cardTitle)}>
          Regions With The Highest Write Flow.
        </Typography>
        <CardContent>
          <div style={styles.flexedControls}>
            <Button onClick={this.updateModeIndex(false)} {...btnProps}>
              PREV MODE
            </Button>
            <div> {MODE[modeIndex]} </div>
            <Button onClick={this.updateModeIndex(true)} {...btnProps}>
              NEXT MODE
            </Button>
          </div>
          <Sankey
            animation
            margin={50}
            nodes={DataFlow.nodes}
            links={DataFlow.links}
            width={960}
            align={MODE[modeIndex]}
            height={500}
            layout={24}
            nodeWidth={15}
            nodePadding={10}
            style={{
              links: {
                opacity: 0.3,
              },
              labels: {
                fontSize: '8px',
              },
              rects: {
                strokeWidth: 2,
                stroke: '#1A3177',
              },
            }}
          />

          <div>Stores Write Flow</div>
          <Sankey
            nodes={nodes.map(d => ({ ...d }))}
            links={links.map((d, i) => ({
              ...d,
              opacity:
                activeLink && i === activeLink.index
                  ? FOCUSED_LINK_OPACITY
                  : BLURRED_LINK_OPACITY,
            }))}
            width={700}
            height={600}
            // do not use voronoi in combination with link mouse over
            hasVoronoi={false}
            onLinkMouseOver={node => this.setState({ activeLink: node })}
            onLinkMouseOut={() => this.setState({ activeLink: null })}>
            {activeLink && this.renderHint()}
          </Sankey>
        </CardContent>
      </Card>
    )
  }
}
