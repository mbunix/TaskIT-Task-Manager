import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ChatDots, BellFill, PatchPlus } from 'react-bootstrap-icons'
import Workspace from '../dashboard/workspace/worspace' // Make sure the path is correct to the Workspace component
import './menuboard.css'

const Menuboard = () => {

  return (
    <>
      <div
        className='menuboard-container'
        style={{ backgroundColor: '#CCCCCC' }}
      >
        <div className='menuboard-container-items'>
          <img
            src='public/logo.png'
            alt='taskit-logo'
            className='logo-image'
            style={{ width: '80px', marginLeft: '-31px', borderRadius: '5px' }}
          />

          <input
            type='text'
            className='menuboard-searchbar-input'
            placeholder='Search Your Task'
            style={{ width: '160px' }}
          />
          <div
            className='menuboard-content'
            style={{
              marginLeft: '2px',
              marginRight: '-13px',
              width: '700px',
              borderRadius: '5px',
              justifyContent: 'space-around'
            }}
          >
            <div className='menuboard-list'>
              <a href='#' className='menuboard-list-item'>
                List
              </a>
              <a href='#' className='menuboard-list-item'>
                Board
              </a>
              <a href='#' className='menuboard-list-item'>
                Calendar
              </a>
            </div>
            <Button
              className='menuboard-button'
              style={{
                width: '180px',
                display: 'flex',
                justifyContent: 'space-around',
                backgroundColor: '#0d6efd'
              }}
            >
              <PatchPlus style={{ marginLeft: '-15px', marginTop: '5px' }} />
              Add a Workspace
            </Button>
            <div
              className='menuboard-content-item-message'
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'row'
              }}
            >
              <ChatDots
                className='chats-icon'
                style={{
                  marginLeft: '-15px',
                  marginTop: '10px',
                  width: '70px'
                }}
              />
              <BellFill
                className='bell-icon'
                style={{ marginLeft: '15px', marginTop: '10px' }}
              />
            </div>
            <div
              className='profile-pic-avarter'
              style={{
                marginTop: '10px',
                marginLeft: '10px',
                width: '50px',
                borderRadius: '50%'
              }}
            >
              <img src='public/user.png' alt='user-profile' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menuboard
