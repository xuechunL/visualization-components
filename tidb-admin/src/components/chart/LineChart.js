import React from 'react'
import '../../../node_modules/react-vis/dist/style.css'
import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  Crosshair,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis'
// import _ from 'lodash'

// TODO: date formate
const formatDate = date => new Date(date * 1000).toLocaleString()

class LineChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      crosshairValues: [],
    }

    this._onMouseLeave = this._onMouseLeave.bind(this)
    this._onNearestX = this._onNearestX.bind(this)
  }

  _onMouseLeave() {
    this.setState({ crosshairValues: [] })
  }

  _onNearestX(value, { index }) {
    const { metric } = this.props
    // console.log(value)
    // console.log(index)
    const values = metric.map(m => {
      return {
        x: value.x,
        y: +m.values[index][1],
      }
    })

    console.log(values)
    this.setState({ crosshairValues: values })
  }

  formatData(data = []) {
    // console.log(data)
    return data.map(d => {
      return { x: d[0], y: d[1] }
    })
  }

  render() {
    const {
      width = 300,
      height = 150,
      theme = 'typpeA',
      metric = [],
    } = this.props

    const { crosshairValues } = this.state

    console.log('crosshairValues', crosshairValues)

    const colorRanges = {
      typeA: ['#59E4EC', '#0D676C'],
      typeB: ['#EFC1E3', '#B52F93'],
    }

    const lineSeriesProps = {
      animation: true,
      className: 'line-series-example',
      sizeRange: [5, 15],
      color: theme === 'typeA' ? '#0D676C' : '#B52F93',
      colorRange: colorRanges[theme],
      opacityType: 'literal',
      strokeWidth: 1,
      onNearestX: this._onNearestX,
    }

    if (metric.length)
      return (
        <div className="line-chart">
          <XYPlot
            onMouseLeave={this._onMouseLeave}
            width={width}
            height={height}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickFormat={v => formatDate(v).split(' ')[1]} />
            <YAxis />
            {metric.map(m => {
              return (
                <LineSeries
                  key={m.metric.instance}
                  data={this.formatData(m.values)}
                  {...lineSeriesProps}
                />
              )
            })}
            <Crosshair values={crosshairValues}>
              {crosshairValues.length && (
                <div
                  style={{
                    background: 'rgba(0,0,0,0.85)',
                    width: '12em',
                    padding: '0.5em 1em',
                    borderRadius: '6px',
                    color: '#fff',
                  }}>
                  <h3
                    style={{
                      fontSize: '1em',
                      textAlign: 'center',
                    }}>
                    {formatDate(crosshairValues[0].x)}
                  </h3>
                  {metric.map((m, idx) => (
                    <p
                      key={metric[idx].metric.instance}
                      tyle={{
                        fontSize: '0.85em',
                      }}>
                      {metric[idx].metric.instance}: {crosshairValues[idx].y}
                    </p>
                  ))}
                </div>
              )}
            </Crosshair>
            {/* <Crosshair values={crosshairValues} /> */}
          </XYPlot>
        </div>
      )
    else return <div>No data point!</div>
  }
}

export default LineChart
