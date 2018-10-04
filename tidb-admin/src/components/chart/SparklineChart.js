import React from 'react'
import PropTypes from 'prop-types'

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'


class SparklineChart extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { width = 400, color = "blue", metric = [] } = this.props
    let data = []

    if (metric && metric.length) {
      // TODO: multi tidb cluster ??? result.length
      // TODO: process data
      console.log('metric data', metric)
      const _metric = metric[0].values
      data = _metric.map(i => +i[1])
      // data = data[0].values
    }
    console.log('metric data in sparkline', data)
    return (
      <Sparklines data={data} limit={20} margin={6} svgWidth={width} >
        <SparklinesLine style={{ stroke: "#336aff", fill: "none" }} />
        <SparklinesSpots size={2} style={{ stroke: "#336aff", fill: "white" }} />
      </Sparklines>
    )
  }
}

SparklineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  data: PropTypes.array,
}

export default SparklineChart
