import React, { useState } from 'react'
import Sideboard from '../../components/sideboard/sideboard'
import Dashboard from '../../components/dashboard/dashboard'
import Menuboard from '../../components/menuboard/menuboard'

export default function Homepage ({ isDarkMode }) {
  const [workspaceVisible, setWorkspaceVisible] = useState(false)

  const handleShowWorkspace = () => {
    setWorkspaceVisible(!workspaceVisible)
  }

  return (
    <div className={`homepage ${isDarkMode ? 'dark-mode' : ''}`}>
      <Menuboard
        handleShowWorkspace={handleShowWorkspace}
        isDarkMode={isDarkMode}
      />{' '}
      {/* Pass the isDarkMode prop to Menuboard */}
      <div className='boards'>
        <Dashboard isDarkMode={isDarkMode} />{' '}
        {/* Pass the isDarkMode prop to Dashboard */}
        <Sideboard isDarkMode={isDarkMode} />{' '}
        {/* Pass the isDarkMode prop to Sideboard */}
      </div>
    </div>
  )
}
