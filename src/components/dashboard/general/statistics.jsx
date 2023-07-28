import React, { useState, useEffect } from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import { useSelector } from 'react-redux'
import axios from 'axios'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

import api from '../../../utils/api'

function AllStatistics () {
  const userInfo = useSelector(state => state.userLogin.userInfo.token)
  const [lineChartData, setLineChartData] = useState([])
  const [heatMapData, setHeatMapData] = useState([])

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const res = await axios.get(`${api}/projects/project`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${userInfo}`
          }
        })

        const { onProgress, scheduled, completed } = res.data
        // Calculate data for line chart
        const lineChartData = calculateLineChartData(
          onProgress,
          scheduled,
          completed
        )
        setLineChartData(lineChartData)

        // Calculate data for heat-map chart
        const heatMapData = calculateHeatMapData(
          onProgress,
          scheduled,
          completed
        )
        setHeatMapData(heatMapData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchProjectsData()
  }, [userInfo])

  const calculateLineChartData = (onProgress, scheduled, completed) => {
    const daysInMonth = 30 // Assuming there are 30 days in the month
    const lineChartData = new Array(daysInMonth).fill({
      completed: 0,
      inProgress: 0,
      scheduled: 0
    })

    // Check if onProgress array is defined and has valid data
    if (Array.isArray(onProgress)) {
      onProgress.forEach(project => {
        const day = new Date(project.startDate).getDate()
        if (lineChartData[day - 1]) {
          lineChartData[day - 1].inProgress++
        }
      })
    }

    // Check if scheduled array is defined and has valid data
    if (Array.isArray(scheduled)) {
      scheduled.forEach(project => {
        const day = new Date(project.startDate).getDate()
        if (lineChartData[day - 1]) {
          lineChartData[day - 1].scheduled++
        }
      })
    }

    // Check if completed array is defined and has valid data
    if (Array.isArray(completed)) {
      completed.forEach(project => {
        const day = new Date(project.startDate).getDate()
        if (lineChartData[day - 1]) {
          lineChartData[day - 1].completed++
        }
      })
    }

    return lineChartData
  }

  const calculateHeatMapData = (onProgress, scheduled, completed) => {
    // Check if any of the arrays is not available or empty
    if (
      !Array.isArray(onProgress) ||
      !Array.isArray(scheduled) ||
      !Array.isArray(completed)
    ) {
      return []
    }

    // Calculate the data for the waterfall chart based on the number of projects in onProgress, scheduled, and completed.
    // Return an array of data points suitable for the heat-map chart.
    const waterfallDataPoints = []

    // Calculate the initial count
    let initialCount = onProgress.length + scheduled.length + completed.length
    waterfallDataPoints.push({ label: 'Initial', y: initialCount })

    // Calculate the data for each month
    let monthCount = completed.length
    waterfallDataPoints.push({ label: 'Jan', y: monthCount })

    monthCount += scheduled.length
    waterfallDataPoints.push({ label: 'Feb', y: monthCount })

    monthCount += onProgress.length
    waterfallDataPoints.push({ label: 'Mar', y: -monthCount })

    // ... Calculate data for other months
    // Replace the hardcoded y-values with the calculated complete, inProgress, and scheduled values

    waterfallDataPoints.push({
      label: 'Apr',
      y: monthCount + onProgress.length
    }) // Example: Use "inProgress" array
    waterfallDataPoints.push({
      label: 'May',
      y: monthCount + onProgress.length + scheduled.length
    })
    waterfallDataPoints.push({
      label: 'Jun',
      y: -monthCount - completed.length
    }) // Example: Use "completed" array
    waterfallDataPoints.push({
      label: 'July',
      y: monthCount + onProgress.length + scheduled.length + completed.length
    })
    waterfallDataPoints.push({
      label: 'Aug',
      y:
        monthCount +
        onProgress.length +
        scheduled.length +
        completed.length +
        scheduled.length
    }) // Example: Use "scheduled" array
    // ... Continue for other months

    // Add a final data point with isCumulativeSum: true and indexLabel: "{y}" to show the final cumulative sum
    waterfallDataPoints.push({
      label: 'Final',
      y: monthCount + onProgress.length + scheduled.length + completed.length,
      isCumulativeSum: true,
      indexLabel: '{y}'
    })

    return waterfallDataPoints
    // Returns an array of data points
  }

  const renderLineChart = dataPoints => {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Projects Status by Day of the Month'
      },
      axisX: {
        title: 'Day of the Month',
        interval: 2
      },
      axisY: {
        title: 'Number of Projects',
        includeZero: true
      },
      data: [
        {
          type: 'line',
          name: 'Completed',
          showInLegend: true,
          dataPoints: dataPoints.map((data, index) => ({
            x: index + 1,
            y: data.completed
          }))
        },
        {
          type: 'line',
          name: 'In Progress',
          showInLegend: true,
          dataPoints: dataPoints.map((data, index) => ({
            x: index + 1,
            y: data.inProgress
          }))
        },
        {
          type: 'line',
          name: 'Scheduled',
          showInLegend: true,
          dataPoints: dataPoints.map((data, index) => ({
            x: index + 1,
            y: data.scheduled
          }))
        }
      ]
    }

    return (
      <CanvasJSChart
        options={options}
        style={{ innerwidth: '20px', innerHeight: '20px' }}
      />
    )
  }

  const renderHeatMap = dataPoints => {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Waterfall Chart of Projects over the Month'
      },
      axisX: {
        title: 'Day of the Month',
        interval: 2
      },
      axisY: {
        title: 'Number of Projects',
        includeZero: true
      },
      data: [
        {
          type: 'waterfall',
          indexLabel: '{y}',
          yValueFormatString: '#,##0',
          dataPoints
        }
      ]
    }

    return (
      <CanvasJSChart
        options={options}
        style={{ innerwidth: '200px', innerHeight: '200px' }}
      />
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '750px',
        height: '533.5px',
        gap: '20px',
        backgroundColor: '#CCCCCC',
        marginTop: '20px',
        fontFamily: 'Noto Sans',
        fontWeight: '20px'
      }}
    >
      {/* Render the line chart */}
      {renderLineChart(lineChartData)}
      {/* Render the heat-map */}
      {renderHeatMap(heatMapData)}
    </div>
  )
}

export default AllStatistics
