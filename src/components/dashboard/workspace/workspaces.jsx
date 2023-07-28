import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { TrashFill } from 'react-bootstrap-icons'
import api from '../../../utils/api'
function Workspaces () {
  const [workspaces, setWorkspaces] = useState([])
  const userInfo =useSelector(state => state.userLogin.userInfo.token)
  
  useEffect(() => {
    // Function to fetch workspaces from the API
    const fetchWorkspaces = async () => {
      try {
        const response = await axios.get(`${api}/workspaces/workspace`,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${userInfo}`
            }}
        )
        setWorkspaces(response.data) // Assuming the API response is an array of workspace objects
       console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchWorkspaces()
  }, [])
  return (
    <div>
      {Array.isArray(workspaces) && workspaces.map(workspace => (
        <div key={workspace.id} >
          <div style={{display: 'flex', justifyContent: 'start'}}>{workspace.name} <TrashFill style={{color: 'red', marginLeft: '30px'}} /></div>
        </div>
      ))}
    </div>
  )
}

export default Workspaces
// onClick={() => deleteWorkspace(workspace.id)}