import React from 'react'
import { Fire, FileLockFill } from 'react-bootstrap-icons'
const Introsection = () => {

  return (
    <div
      className='introsection'
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <div className='workspace-intro'>
        <h2 style={{ padding: '5px', fontFamily: 'Noto Sans' }}>
          WorkSpace/The Jitu/ Board
        </h2>
        <h3
          style={{
            color: '#222222',
            fontFamily: 'Noto Sans',
            fontSize: '48px',
            fontStyle: 'normal',
            fontweight: '600',
            lineHeight: 'normal',
            letterSpacing: '1.44px',
            padding: '5px'
          }}
        >
          The Jitu LLC{' '}
          <Fire
            style={{
              color: '#FF4500',
              width: '120px',
              marginLeft: '240px',
              marginTop: '-50px'
            }}
          />
        </h3>
        <h4
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '5px',
            fontFamily: 'Noto Sans'
          }}
        >
          Working on a new project guys what do you guys think ?<br />
          credits to jared
        </h4>
      </div>
      <div
        className='visibility'
        style={{
          marginLeft: '140px',
          marginRight: '30px',
          fontFamily: 'Noto Sans'
        }}
      >
        Visibility
        <div style={{display: 'flex',flexDirection:'row',justifyContent:'space-around',gap:'10px'}}>
          <FileLockFill />
          Private
        </div>
      </div>
      <div
        className='teams'
        style={{ marginLeft: '30px', fontFamily: 'Noto Sans' }}
      >
        Teams
      </div>
    </div>
  )
}

export default Introsection
