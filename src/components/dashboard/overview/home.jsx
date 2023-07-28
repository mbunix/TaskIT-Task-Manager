import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProgressBar from 'react-bootstrap/ProgressBar'
import api from '../../../utils/api'
import { useSelector } from 'react-redux'

function Home () {
  const [userProjects, setUserProjects] = useState([])
  const [userStatistics, setUserStatistics] = useState([])
  const [recentAlerts, setRecentAlerts] = useState([])
  const [userData, setUserData] = useState([])

  const userInfo = useSelector(state => state.userLogin.userInfo)

  const fetchUserData = async () => {
    try {
      const userInfoResponse = await axios.get(`${api}/users`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`
        }
      })
      setUserData(userInfoResponse.data)
      // console.log(userInfoResponse.data)

      const userProjectsResponse = await axios.get(`${api}/projects/project`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`
        }
      })
      setUserProjects(userProjectsResponse.data.onProgress)

      const userStatisticsResponse = await axios.get(
        `${api}/projects/project`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${userInfo.token}`
          }
        }
      )
      setUserStatistics([
        ...userStatisticsResponse.data.completed,
        ...userStatisticsResponse.data.onProgress
      ])

      const recentAlertsResponse = await axios.get(`${api}/github`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`
        }
      })
      setRecentAlerts(recentAlertsResponse.data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(userData)

  useEffect(() => {
    fetchUserData()
  }, [])

  const getProgressBarData = key => {
    const totalProjects = userProjects.length
    const percentage =
      (userStatistics.filter(project => project.complete === key).length /
        totalProjects) *
      100

    if (key === 'completed') {
      return {
        percentage,
        color: '#38B000' // Green color for completed projects
      }
    } else if (key === 'onProgress') {
      return {
        percentage,
        color: '#4361EE' // Blue color for in-progress projects
      }
    } else if (key === 'scheduled') {
      return {
        percentage,
        color: '#FB5607' // Orange color for scheduled projects
      }
    }

    return {
      percentage,
      color: '#000000' // Black color for unknown keys
    }
  }

  return (
    <div
      className='user-information'
      style={{
        width: '400px',
        height: '400px',
        marginLeft: '40px',
        marginTop: '15px',
        border: '2px solid black',
        borderRadius: '10px',
        fontFamily:'Noto Sans',
      }}
    >
      <h2>User Information</h2>
      <div>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        {userData.profileAvatar && (
          <img src={userData.profileAvatar} alt='Profile Avatar' />
        )}
      </div>

      <h2>User Projects</h2>
      <ul>
        {userProjects.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>

      <h2>User Statistics</h2>
      <div>
        <p>Total Projects: {userProjects.length}</p>
        <ProgressBar
          now={getProgressBarData('completed').percentage}
          label={`${getProgressBarData('completed').percentage.toFixed(2)}%`}
          style={{ backgroundColor: getProgressBarData('completed').color }}
        />
        <ProgressBar
          now={getProgressBarData('onProgress').percentage}
          label={`${getProgressBarData('onProgress').percentage.toFixed(2)}%`}
          style={{ backgroundColor: getProgressBarData('onProgress').color }}
        />
        <ProgressBar
          now={getProgressBarData('scheduled').percentage}
          label={`${getProgressBarData('scheduled').percentage.toFixed(2)}%`}
          style={{ backgroundColor: getProgressBarData('scheduled').color }}
        />
      </div>

      <h2>Recent Alerts</h2>
      <ul>
        {recentAlerts.map(alert => (
          <li key={alert.id}>{alert.message}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
