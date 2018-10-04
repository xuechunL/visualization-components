import React from 'react'
import PropTypes from 'prop-types'

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'


class SparklineChart extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { width = 400, color = "#2979ff", metric = [] } = this.props

    if (metric && metric.length) {
      let data = []
      // TODO: multi tidb cluster ??? result.length
      // TODO: process data
      console.log('metric data', metric)
      const _metric = metric[0].values
      data = _metric.map(i => +i[1])
      return (
        <Sparklines data={data} limit={20} margin={6} svgWidth={width} >
          <SparklinesLine style={{ stroke: color, fill: "none" }} />
          <SparklinesSpots size={2} style={{ stroke: color, fill: "white" }} />
        </Sparklines>
      )
    } else {
      // TODO: No Data
      return <div> No data points!</div>
    }



  }
}

SparklineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  data: PropTypes.array,
}

export default SparklineChart
