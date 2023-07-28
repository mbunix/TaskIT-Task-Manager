import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import api from '../../../../utils/api'

const Scheduled = ({ setDescriptions }) => {
  const userInfo = useSelector(state => state.userLogin.userInfo.token)

  useEffect(() => {
    const fetchScheduledProjects = async () => {
      try {
        const res = await axios.get(`${api}/projects/project`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${userInfo}`
          }
        })
        console.log(res.data)
        setDescriptions(res.data.onProgress.map(project => project.description)) // Set the descriptions in the parent component
      } catch (err) {
        console.log(err)
      }
    }

    fetchScheduledProjects()
  }, [userInfo, setDescriptions])

  return null // Scheduled component doesn't render anything directly, it just fetches and passes the data
}

export default Scheduled
