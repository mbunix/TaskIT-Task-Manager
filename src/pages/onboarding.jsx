import Signup from './home/signup/signup'
import React, { useState, useEffect } from 'react'
import './onboarding.css'
const Onboarding = () => {
  const [displaySignup, setDisplaySignup] = useState(false)

  return (
    <div
      className='onboaring'
      style={{
        backgroundColor: '#0C0B16',
        marginTop: '-50x',
        height: '1200px',
        fontFamily:'libre Franklin'
      }}
    >
      <div className='logo-intro' style={{ marginTop: '40px' }}>
        <img
          src='public/logo.png'
          alt='taskit-logo'
          style={{
            width: '100px',
            marginLeft: '41px',
            marginTop: '-40px',
            borderRadius: '5px'
          }}
        />
        <button
          className='free-trial'
          style={{
            width: '120px',
            marginLeft: '950px',
            marginTop: '-30px',
            color: '#FFF'
          }}
          onClick={() => setDisplaySignup(!displaySignup)}
        >
          Free Trial
        </button>
      </div>
      <div
        className='introsection'
        style={{ display: 'flex', flexDirection: 'row', marginTop: '40px' }}
      >
        <h2
          style={{
            marginLeft: '100px',
            fontSize: '55px',
            marginTop: '40px',
            color: '#FFF',
            fontFamily: 'libre Franklin'

          }}
        >
          Welcome to Your<br></br>
          AI Powered<br></br>
          Project and Task Manager
        </h2>
        <div className='sponsers-container'></div>
        <img
          src='task_man.png'
          alt='task-manager_status'
          style={{ width: '700px', borderRadius: '15px', height: '330px' }}
        />
      </div>

      <div className='sponsered-by-container' style={{ marginTop: '' }}>
        <p style={{ marginLeft: '70px', color: '#FFF', fontSize: '20px' ,fontFamily:'libre Franklin'}}>
          {' '}
          Find inspiraton prepare for the future<br></br>
          <h3 style={{ marginLeft:'50PX',marginTop:'40px'}}>Proudly sponsered by</h3>
          <img
            src='task_man2.png'
            alt='task-manager_status'
            style={{
              width: '700px',
              borderRadius: '15px',
              marginLeft: '550px',
              height: '330px',
              marginTop: '-61px'
            }}
          />
          <div
            className='sponsers-container'
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '-290px',
              marginLeft: '-80px'
            }}
          >
            <img
              src='coca-cola-logo.svg'
              alt='cartoon-network'
              style={{ width: '130px', height: '130px', borderRadius: '5px' }}
            />
            <img
              src='booking-logo@logotyp.us.svg'
              alt='cartoon-network'
              style={{ width: '130px', height: '130px', borderRadius: '5px' }}
            />

            <img
              src='netflix-logo.svg'
              alt='cartoon-network'
              style={{ width: '130px', height: '130px', borderRadius: '5px' }}
            />
            <img
              src='safaricom-logo.svg'
              alt='cartoon-network'
              style={{ width: '130px', height: '130px', borderRadius: '5px' }}
            />
            <img
              src='spotify-logo.svg'
              alt='cartoon-network'
              style={{ width: '130px', height: '130px', borderRadius: '5px' }}
            />
          </div>
          <h2 style={{ marginTop: '160px', marginLeft: '300px', fontFamily: 'Noto Sans', fontWeight: 'bold', fontSize: '30px', padding:'4px'}}>
            Key Benefits of Using Taskit<br></br>
            Task management System
          </h2>
          <div
            className='key-benefits'
            style={{
              marginTop: '50px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent:'space-between',
              width:'1000px'
            }}
          >
            <div className='key-benefit-one'>
              <img
                src='task_management1.png'
                alt='task-manager_status'
                style={{
                  width: '130px',
                  height: '120px',
                  borderRadius: '5px'
                }}
              />
              <h3 style={{fontFamily:'Noto Sans',fontWeight:'bold', fontSize:'20px',padding:'4px'}}>Keeps Tasks in One place</h3>
              <p style={{fontFamily:'Noto Sans',fontWeight:'bold', fontSize:'15px', marginRight:'50px'}}>
                Save Time avoid Loosing work and information,<br></br> delegate and
                track tasks to stay on schedule
              </p>
            </div>
            <div className='key-benefit-two'>
              <img
                src='task_management2.jpg'
                alt='task-manager_status'
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '5px'
                }}
              />
              <h3 style={{fontFamily:'Noto Sans',fontWeight:'bold', fontSize:'20px',padding:'4px'}}>Prioritize Your Work</h3>
              <p  style={{fontFamily:'Noto Sans',fontWeight:'bold', fontSize:'15px',marginRight: '50px'}}>
                Track projects and tasks to stay on schedule<br></br> and make sure you
                are on track
              </p>
            </div>
            <div className='key-benefit-three'>
              <img
                src='task_management3.jpg'
                alt='task-manager_status'
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '5px'
                }}
              />
              <h3  style={{fontFamily:'Noto Sans',fontWeight:'bold', fontSize:'20px',padding:'4px'}}>Improve Collaboration and Prodictivity</h3>
              <p  style={{fontFamily:'Noto Sans',fontWeight:'bold', fontSize:'15px'}}>
                Tracking Tasks allow everyone to<br></br>
                understand which are more
                important or require more time
              </p>
            </div>
          </div>
        </p>
      </div>

      {displaySignup && <Signup />}
    </div>
  )
}
export default Onboarding
