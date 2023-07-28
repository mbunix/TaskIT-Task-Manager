import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../../../utils/api'
import { useSelector } from 'react-redux'


function MyTask () {
  const [userTasks, setUserTasks] = useState([])

  const fetchUserTasks = async () => {
    try {
      // Fetch user tasks from the server using the appropriate API endpoint
      // and the necessary authentication headers
      const userInfo = useSelector(state => state.userLogin.userInfo)
      const res = await axios.get(`${api}/projects/project`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`
        }
      })
      // Assuming the response contains an array of tasks
      setUserTasks(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserTasks()
  }, [])

  return (
    <div>
      <h2>My Tasks</h2>
      {userTasks.length === 0 ? (
        <p>No tasks assigned to you.</p>
      ) : (
        <ul>
            {userTasks.map(task => (
              <li key={task._id}>{task.description}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyTask
