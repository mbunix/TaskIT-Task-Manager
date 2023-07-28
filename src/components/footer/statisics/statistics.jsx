import React from 'react'
import { Card } from 'react-bootstrap'
import CanvasJSReact from '@canvasjs/react-charts'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

function Statistics ({ scheduledDescriptions, onprogressDescriptions,completeDescriptions }) {
  const totalProjects =
    scheduledDescriptions.length + onprogressDescriptions.length
  const scheduledPercentage =
    (scheduledDescriptions.length / totalProjects) * 100
  const onProgressPercentage =
    (onprogressDescriptions.length / totalProjects) * 100
  const completePercentage =
    (completeDescriptions.length / totalProjects) * 100

  return (
    <div
      className='main-board-statistics'
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '-5px',
        marginLeft: '0px',
        backgroundColor: '#CCCCCC',
        height: '170px'
      }}
    >
      <Card
        className='mt-2'
        style={{
          width: '500px',
          height: '150px',
          marginLeft: '20px',
          marginTop: '50px'
        }}
      >
        <CanvasJSChart options={getScheduledOptions(scheduledPercentage)} />
      </Card>
      <Card
        className='mt-3'
        style={{ width: '490px', height: '145px', marginLeft: '20px' }}
      >
        <CanvasJSChart options={getOnProgressOptions(onProgressPercentage)} />
      </Card>
      <Card
        className='mt-3'
        style={{ width: '490px', height: '147px', marginLeft: '20px' }}
      >
        <CanvasJSChart options={getCompleteOptions(completePercentage)} />
      </Card>
    </div>
  )
}

// Helper function to get options for Scheduled chart
function getScheduledOptions (scheduledPercentage) {
  const options = {
    animationEnabled: true,
    title: {
      text: 'Scheduled'
    },
    data: [
      {
        type: 'doughnut',
        showInLegend: true,
        indexLabel: '{name}:{y}',
        yValueFormatString: "###'%'",
        dataPoints: [
          { name: 'Scheduled', y: scheduledPercentage, color: '#FB5607' }
        ]
      }
    ]
  }
  return options
}

// Helper function to get options for On Progress chart
function getOnProgressOptions (onProgressPercentage) {
  const options = {
    animationEnabled: true,
    title: {
      text: 'On Progress'
    },
    data: [
      {
        type: 'doughnut',
        showInLegend: true,
        indexLabel: '{name}:{y}',
        yValueFormatString: "###'%'",
        dataPoints: [
          { name: 'On Progress', y: onProgressPercentage, color: '#4361EE' }
        ]
      }
    ]
  }
  return options
}

// Helper function to get options for Complete chart
function getCompleteOptions (completePercentage) {
  const options = {
    animationEnabled: true,
    title: {
      text: 'Complete'
    },
    data: [
      {
        type: 'doughnut',
        showInLegend: true,
        indexLabel: '{name}:{y}',
        yValueFormatString: "###'%'",
        dataPoints: [
          { name: 'Complete', y: completePercentage, color: '#38B000' }
        ]
      }
    ]
  }
  return options
}

export default Statistics
