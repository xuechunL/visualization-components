import React from 'react'
import { Treemap } from 'react-vis'

// import _  from 'lodash'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

const _getRandomData = total => {
  const totalLeaves = total || Math.random() * 20
  const leaves = []
  for (let i = 0; i < totalLeaves; i++) {
    leaves.push({
      title: total ? total : String(Math.random()).slice(0, 3),
      size: Math.random() * 1000,
      color: Math.random(),
      style: {
        border: 'thin solid #88572c',
      },
    })
  }
  return {
    title: '',
    color: 1,
    children: leaves,
  }
}

const myData = {
  title: 'TiKV Regions',
  // "color": "#12939A",
  children: [
    {
      title: 'Store#1',
      style: { border: 'thin solid red' },
      children: [
        {
          title: 'Region#13',
          color: '#12939A',
          size: 3938,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#15',
          color: '#12939A',
          size: 3812,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#25',
          color: '#12939A',
          size: 6714,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#17',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#19',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#23',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#29',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#27',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#31',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#7',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#9',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#11',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#21',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#3',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
      ],
    },
    {
      title: 'Store#4',
      style: { border: 'thin solid red' },
      children: [
        {
          title: 'Region#57',
          color: '#1a3177',
          size: 3938,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#36',
          color: '#1a3177',
          size: 3812,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#38',
          color: '#1a3177',
          size: 6714,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#46',
          color: '#1a3177',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#37',
          color: '#1a3177',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#40',
          color: '#1a3177',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#43',
          color: '#1a3177',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#42',
          color: '#1a3177',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#41',
          color: '#1a3177',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#59',
          color: '#1a3177',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#32',
          color: '#1a3177',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#33',
          color: '#1a3177',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#39',
          color: '#1a3177',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#44',
          color: '#1a3177',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
      ],
    },
    {
      title: 'Store#5',
      style: { border: 'thin solid red' },
      children: [
        {
          title: 'Region#35',
          color: '#12939A',
          size: 3938,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#47',
          color: '#12939A',
          size: 3812,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#49',
          color: '#12939A',
          size: 6714,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#34',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#48',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#51',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#54',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#53',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#52',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#58',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#45',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#56',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#50',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
        {
          title: 'Region#55',
          color: '#12939A',
          size: 743,
          style: { border: 'thin solid #88572c' },
        },
      ],
    },
  ],
}

const styles = {
  button: {
    margin: '10px 0',
  },
}

class RegionsTreeMap extends React.Component {
  state = {
    hoveredNode: false,
    treemapData: myData,
    useCirclePacking: false,
  }
  render() {
    const { hoveredNode, useCirclePacking } = this.state
    const treeProps = {
      animation: {
        damping: 9,
        stiffness: 300,
      },
      title: 'Regions Tree Tree Map',
      data: this.state.treemapData,
      onLeafMouseOver: x => this.setState({ hoveredNode: x }),
      onLeafMouseOut: () => this.setState({ hoveredNode: false }),
      // onLeafClick: (leafNode, domEvent) =>{
      //   console.log(leafNode)
      //   window.location.href= `#region/${_.last(leafNode.data.title.split('#'))}`
      // },
      onLeafClick: () => this.setState({ treemapData: _getRandomData() }),
      height: 600,
      mode: this.state.useCirclePacking ? 'circlePack' : 'squarify',
      getLabel: x => x.title,
      width: 960,
    }

    const { classes } = this.props

    return (
      <Card key="regions-tree-map" className={classes.chartCard}>
        <CardContent>
          <Button
            variant="outlined"
            color="primary"
            style={styles.button}
            onClick={() =>
              this.setState({ useCirclePacking: !useCirclePacking })
            }>
            TOGGLE CIRCLE PACK
          </Button>
          <Treemap {...treeProps} />
          click above to the get detail info about &nbsp;
          {hoveredNode && hoveredNode.data.title}
        </CardContent>
      </Card>
    )
  }
}

export default RegionsTreeMap
