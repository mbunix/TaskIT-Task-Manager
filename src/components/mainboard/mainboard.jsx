import React, { useState, useEffect } from 'react'
import { CDBSidebar } from 'cdbreact'
import Introsection from './introsection/introsection'
import { Card } from 'react-bootstrap'
import './mainboard.css'
import {
  PlayFill,
  ThreeDots,
  CalendarWeekFill,
  ChatDots
} from 'react-bootstrap-icons'

import EditProject from '../dashboard/workspace/project/editProject'

import Completed from './projects/complete/complete'
import Statistics from '../footer/statisics/statistics'
import axios from 'axios'
import api from '../../utils/api'
import { useSelector } from 'react-redux'

const MainBoard = ({ content }) => {
  const [editProject, setEditProject] = useState(false)
  const [scheduledDescriptions, setScheduledDescriptions] = useState([])
  const [onprogressDescriptions, setOnprogressDescriptions] = useState([])
  const [completeDescriptions, setCompleteDescriptions] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  const userInfo = useSelector(state => state.userLogin.userInfo.token)
  const handleShowProject = projectId => {
    if (selectedProjectId === projectId) {
      // Clicking on the same project again will close the EditProject component
      setSelectedProjectId(null)
    } else {
      setSelectedProjectId(projectId)
    }
  }

  useEffect(() => {
    // Fetch the descriptions when the component mounts
    const fetchDescriptions = async () => {
      const scheduledDescriptions = await getScheduledDescriptions()
      const onprogressDescriptions = await getOnProgessDescriptions()
      const completeDescriptions = await getCompleteDescriptions()
      setScheduledDescriptions(scheduledDescriptions)
      setOnprogressDescriptions(onprogressDescriptions)
      setCompleteDescriptions(completeDescriptions)
    }

    fetchDescriptions()
  }, [])

  const getScheduledDescriptions = async () => {
    try {
      const response = await fetchScheduledProjects()
      return response.map(project => project.description)
    } catch (error) {
      console.log(error)
      return []
    }
  }
  const getOnProgessDescriptions = async () => {
    try {
      const response = await fetchOnprogressProjects()
      return response.map(project => project.description)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const fetchScheduledProjects = async () => {
    try {
      const res = await axios.get(`${api}/projects/project`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo}`
        }
      })
      return res.data.onProgress
    } catch (err) {
      console.log(err)
      return []
    }
  }

  const fetchOnprogressProjects = async () => {
    try {
      const res = await axios.get(`${api}/projects/project`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo}`
        }
      })
      return res.data.onProgress
    } catch (err) {
      console.log(err)
      return []
    }
  }
  const getCompleteDescriptions = async () => {
    try {
      const response = await fetchCompleteProjects()
      return response.map(project => project.description)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const fetchCompleteProjects = async () => {
    try {
      const res = await axios.get(`${api}/projects/project`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo}`
        }
      })
      return res.data.completed
    } catch (err) {
      console.log(err)
      return []
    }
  }

  return (
    <div
      className='mainboard-content'
      style={{ width: '775px', height: '865px', backgroundColor: '#CCCCCC' }}
    >
      <div style={{ backgroundColor: '#fff' }}>
        <Introsection />
      </div>
      {content ? (
        content
      ) : (
        <div
          className='main-board'
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '600px',
            background: '#D9D9D9',
            borderRadius: '5px'
          }}
        >
          <CDBSidebar
            textColor='#101010'
            backgroundColor='#CCCCCC'
            boarderRadius='15px'
          >
            <h1
              style={{
                borderRadius: '5px',
                backgroundColor: '#CCCCCC',
                marginLeft: '10px'
              }}
            >
              Scheduled <PlayFill style={{ color: '#FF4500' }} />
            </h1>
            <Card
              style={{
                width: '250px',
                height: '250px',
                flexShrink: '0',
                marginTop: '10px',
                marginLeft: '10px'
              }}
            >
              <Card.Title
                style={{ fontSize: '15px', width: '340px', display: 'flex' }}
              >
                Create Preview Dribble
                <ThreeDots
                  style={{
                    display: 'flex',
                    marginLeft: '80px',
                    width: '20px',
                    height: '20px',
                    color: '#9880ff'
                  }}
                  onClick={() => handleShowProject(1)}
                />
                {editProject && selectedProjectId !== null && (
                  <EditProject projectId={selectedProjectId} />
                )}
              </Card.Title>
              <img
                src='public/project1.png'
                alt='creating the dribble preview'
              />
              <span>
                {scheduledDescriptions.length > 0
                  ? scheduledDescriptions[1]
                  : 'No projects in progress'}
              </span>
              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '20px'
                }}
              >
                <CalendarWeekFill
                  style={{ color: '#4361EE', marginRight: '10px' }}
                />
                Feb 18
                <ChatDots style={{ marginLeft: '10px' }} /> 3
              </div>
            </Card>
            <Card
              style={{
                width: '250px',
                height: '250px',
                flexShrink: '0',
                marginTop: '10px',
                marginLeft: '10px'
              }}
            >
              <ThreeDots
                style={{
                  display: 'flex',
                  marginLeft: '220px',
                  marginBottom: '-15px',
                  width: '20px',
                  height: '20px',
                  color: '#9880ff'
                }}
                onClick={handleShowProject}
              />
              <Card.Title
                style={{ fontSize: '15px', width: '340px', display: 'flex' }}
              >
                Color selection
              </Card.Title>

              <img
                src='public/project4.png'
                alt='color selection'
                style={{ height: '140px', width: '200px' }}
              />
              <span>
                {scheduledDescriptions.length > 1
                  ? scheduledDescriptions[4]
                  : 'No projects in progress'}
              </span>
              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '20px'
                }}
              >
                <CalendarWeekFill
                  style={{ color: '#4361EE', marginRight: '10px' }}
                />
                Feb 23
                <ChatDots style={{ marginLeft: '10px' }} />
              </div>
            </Card>
          </CDBSidebar>
          <CDBSidebar
            textColor='#101010'
            backgroundColor='#CCCCCC'
            boarderRadius='15px'
          >
            <h1 style={{ borderRadius: '5px', backgroundColor: '#CCCCCC' }}>
              On Progress <PlayFill style={{ color: '#302C73' }} />
            </h1>
            <Card
              style={{ width: '250px', height: '250px', marginTop: '10px' }}
            >
              <Card.Title
                style={{ fontSize: '15px', width: '340px', display: 'flex' }}
              >
                User Flow -UX
              </Card.Title>
              <ThreeDots
                style={{
                  display: 'flex',
                  marginTop: '-25px',
                  marginLeft: '220px',
                  width: '20px',
                  height: '20px',
                  color: '#9880ff'
                }}
                onClick={() => handleShowProject(2)}
              />
              <img
                src='public/user-flows-in-ux.jpg'
                alt='user flow'
                style={{ height: '140px', width: '260px', borderRadius: '5px' }}
              />

              <span>
                {onprogressDescriptions.length > 0
                  ? onprogressDescriptions[2]
                  : 'No projects in progress'}
              </span>

              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '20px'
                }}
              >
                <CalendarWeekFill
                  style={{ color: '#4361EE', marginRight: '10px' }}
                />
                Feb 18
                <ChatDots style={{ marginLeft: '10px' }} /> 3
              </div>
            </Card>
            <Card
              style={{
                width: '250px',
                height: '250px',
                flexShrink: '0',
                marginTop: '10px'
              }}
            >
              <Card.Title
                style={{ fontSize: '15px', width: '340px', display: 'flex' }}
              >
                Wireframing The Design
              </Card.Title>
              <ThreeDots
                style={{
                  display: 'flex',
                  marginTop: '-25px',
                  marginLeft: '220px',
                  width: '20px',
                  height: '20px',
                  color: '#9880ff'
                }}
                onClick={() => handleShowProject(3)}
              />

              <img src='public/project3.png' alt='wireframing the design' />
              <span>
                {onprogressDescriptions.length > 1
                  ? onprogressDescriptions[3]
                  : 'No projects in progress'}
              </span>
              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '20px'
                }}
              >
                <CalendarWeekFill
                  style={{ color: '#4361EE', marginRight: '10px' }}
                />
                Feb 28
                <ChatDots style={{ marginLeft: '10px' }} /> 2
              </div>
            </Card>
          </CDBSidebar>
          <CDBSidebar
            textColor='#101010'
            backgroundColor='#CCCCCC'
            boarderRadius='15px'
          >
            <h1 style={{ borderRadius: '5px', backgroundColor: '#CCCCCC' }}>
              Complete <PlayFill style={{ color: '#34893C' }} />
            </h1>
            <Card
              style={{ width: '250px', height: '250px', marginTop: '10px' }}
            >
              <Card.Title
                style={{ fontSize: '15px', width: '340px', display: 'flex' }}
              >
                Visual -SL- Design
              </Card.Title>
              <ThreeDots
                style={{
                  display: 'flex',
                  marginTop: '-30px',
                  marginLeft: '210px',
                  width: '20px',
                  height: '20px',
                  color: '#9880ff'
                }}
                onClick={() => handleShowProject(4)}
              />

              <img
                src='public/project2.png'
                alt='visual -sl- design'
                style={{ height: '140px', width: '200px' }}
              />
              <Completed />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '40px',
                  marginLeft: '20px'
                }}
              >
                <CalendarWeekFill
                  style={{
                    color: '#4361EE',
                    marginRight: '10px',
                    marginLeft: '20px'
                  }}
                />
                March 2
                <ChatDots style={{ marginLeft: '10px' }} /> 6
              </div>
            </Card>
            <Card
              style={{ width: '250px', height: '250px', marginTop: '10px' }}
            >
              <Card.Title
                style={{ fontSize: '15px', width: '340px', display: 'flex' }}
              >
                Prototype Product
              </Card.Title>
              <ThreeDots
                style={{
                  display: 'flex',
                  marginTop: '-25px',
                  marginLeft: '210px',
                  width: '20px',
                  height: '20px',
                  color: '#9880ff'
                }}
                onClick={() => handleShowProject(5)}
              />

              <img
                src='public/project5.jpeg'
                alt='prototype product'
                style={{ width: '300px' }}
              />
              <Completed />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '-20px',
                  marginLeft: '18px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '40px'
                  }}
                >
                  <CalendarWeekFill
                    style={{
                      color: '#4361EE',
                      marginRight: '10px',
                      marginLeft: '20px'
                    }}
                  />
                  March 2
                  <ChatDots style={{ marginLeft: '10px' }} /> 6
                </div>
              </div>
            </Card>
          </CDBSidebar>
        </div>
      )}
      {editProject && selectedProjectId !== null && (
        <EditProject projectId={selectedProjectId} />
      )}

      <div style={{ position: 'fixed', bottom: '0', width: '800px' }}>
        <Statistics
          scheduledDescriptions={scheduledDescriptions}
          onprogressDescriptions={onprogressDescriptions}
          completeDescriptions={completeDescriptions}
        />
      </div>
    </div>
  )
}

export default MainBoard
