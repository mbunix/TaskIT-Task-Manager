import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import api from '../../../../utils/api'
const Completed = () => {
  const [projects, setProjects] = useState([])
const userInfo = useSelector(state => state.userLogin.userInfo.token)

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${api}/projects/project`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo}`
        }
      })
      console.log(res.data)
      setProjects(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  fetchProjects()
}, [])
return (
  <div>
    <h2>
      {Array.isArray(projects.completed) ? (
        projects.completed.map(project => {
          if (project.Project_name === 'Finishing Up') {
            return project.description
          }
          return null
        })
      ) : (
        <span>No projects in progress</span>
      )}
        </h2>
        <h2>
        
        </h2>
  </div>
)
}

export default Completed
