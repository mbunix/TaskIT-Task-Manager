import React, { useEffect, useState } from 'react'

import api from '../../../../utils/api'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

function General () {
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

    // Calculate the number of projects for each day based on the data from onProgress, scheduled, and completed.
    // Update the corresponding data points in the lineChartData array.

    onProgress.forEach(project => {
      const day = new Date(project.startDate).getDate()
      lineChartData[day - 1].inProgress++
    })

    scheduled.forEach(project => {
      const day = new Date(project.startDate).getDate()
      lineChartData[day - 1].scheduled++
    })

    completed.forEach(project => {
      const day = new Date(project.startDate).getDate()
      lineChartData[day - 1].completed++
    })

    return lineChartData
  }

  const calculateHeatMapData = (onProgress, scheduled, completed) => {
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

    return waterfallDataPoints
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

    return <CanvasJSChart options={options} />
  }

  const renderHeatMap = dataPoints => {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Waterfall Chart of Projects over the Month'
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

    return <CanvasJSChart options={options} />
  }

  return (
    <div>
      {/* Render the line chart */}
      {renderLineChart(lineChartData)}
      {/* Render the heat-map */}
      {renderHeatMap(heatMapData)}
    </div>
  )
}

export default General
