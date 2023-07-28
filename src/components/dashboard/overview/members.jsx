import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import api from '../../../utils/api'

function Members () {
  const [members, setMembers] = useState([])
  const userInfo = useSelector(state => state.userLogin.userInfo)

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${api}/workspaces/workspace`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`
        }
      })
      setMembers(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [userInfo.token])

  return (
    <div>
      <h2>Members of the Workspace</h2>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            <strong>Name:</strong> {member.name}, <strong>Email:</strong>{' '}
            {member.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Members
