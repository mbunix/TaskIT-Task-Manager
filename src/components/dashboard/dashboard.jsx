// Dashboard component
import React, { useState } from 'react'
import { Button } from 'mdbreact'
import { useNavigate } from 'react-router'
import Project from './workspace/project/project'
import Home from './overview/home'
import MainBoard from '../mainboard/mainboard'
import MyTask from './overview/mytask'
import Members from './overview/members'
import Workspace from './workspace/worspace'
import Workspaces from './workspace/workspaces'
import AllStatistics from './general/statistics'
import {
  HouseDoorFill,
  JournalArrowDown,
  PeopleFill,
  ArrowUpRightSquare,
  MoonFill
} from 'react-bootstrap-icons'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenuItem
} from 'cdbreact'

const Dashboard = () => {
  const [showProject, setShowProject] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleLinkClick = content => {
    setSelectedContent(content)
  }

  const handleCreateProject = () => {
    setShowProject(true)
    console.log('showProject')
  }
  const handleToggleLight = () => {
    setIsDarkMode(prevIsDarkMode => !prevIsDarkMode)

  }
  const navigate = useNavigate();
  return (
    <div
      style={{ display: 'flex', height: '860px', overflow: 'scroll-initial'}}
    >
      <CDBSidebar textColor='#101010' backgroundColor='#CCCCCC'>
        <CDBSidebarHeader prefix={<i className='fa fa-bars fa-large'></i>}>
          Overview
        </CDBSidebarHeader>
        
          <CDBSidebarMenuItem
            className='home'
            style={{
              width: '150px',
              backgroundColor: 'beige',
              marginLeft: '0px',
              borderRadius: '10px',
              marginBottom: '23px'
            }}
            onClick={() => handleLinkClick(<Home />)}
          >
            <HouseDoorFill /> Home
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            className='mytask'
            style={{
              width: '150px',
              backgroundColor: 'beige',
              borderRadius: '10px',
              marginLeft: '0px',
              marginBottom: '23px'
            }}
            onClick={() => handleLinkClick(<MyTask />)}
          >
            <JournalArrowDown /> My Task
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            className='mytask'
            style={{
              width: '150px',
              backgroundColor: 'beige',
              borderRadius: '10px',
              marginLeft: '0px',
              marginBottom: '23px'
            }}
            onClick={() => handleLinkClick(<Members />)}
          >
            <PeopleFill /> Members
          </CDBSidebarMenuItem>

          <i>
            <CDBSidebarMenuItem
              className='workspaces'
              style={{
                width: '150px',
                backgroundColor: '#00d1b2',
                borderRadius: '10px',
                marginLeft: '0px',
                marginBottom: '23px'
              }}
              onClick={() => handleLinkClick(<Workspace />)}
            >
              <ArrowUpRightSquare />
              Workspaces
            </CDBSidebarMenuItem>
          </i>
              <Workspaces />
          <CDBSidebarMenuItem
            style={{
              backgroundColor: 'beige',
              borderRadius: '10px',
              marginLeft: '0px',
              width: '150px',
              marginTop: '10px'
            }}
           onClick={() => handleLinkClick(<AllStatistics/>)}
          >
           General
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            style={{
              backgroundColor: 'beige',
              borderRadius: '10px',
              marginLeft: '0px',
              width: '150px'
            }}
            onClick={handleToggleLight}
          >
            Settings{''} <MoonFill style={{ marginLeft: '80px',marginTop:'-20PX', width: '20px', height: '20px' }}/>
          </CDBSidebarMenuItem>
            <Button
              onClick={handleCreateProject}
              style={{
                padding: '10px 5px',
                fontWeight: 'bold',
                backgroundColor: '#0d6efd',
                color: 'white',
                marginLeft: '0px',
                borderRadius: '10px',
                width: '150px',
                marginTop: '40PX',
                height: '40px'
              }}
            >
              Add Project
            </Button>
            <CDBSidebarMenuItem
              style={{
                borderRadius: '10px',
                marginLeft: '-15px',
                width: '250px'
              }}
            >
              <Button
                variant='dark'
                className='logout'
                style={{
                  backgroundColor: '#0d6efd',
                  padding: '10px 5px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginLeft: '0px',
                  borderRadius: '10px',
                  width: '150px',
                  height: '40px'
            }}
            onClick={() => {
              localStorage.removeItem('token')
            navigate('/')

            }}
              >
                Logout
              </Button>
            </CDBSidebarMenuItem>
          
        
      </CDBSidebar>
      {showProject ? <Project /> : <MainBoard content={selectedContent} />}
    </div>
  )
}

export default Dashboard
