import React, { Component } from 'react'
import { Container, Button, Card, Col } from 'react-bootstrap'
import CommentBox from './comments/commentsBox'
import Comments from './comments/comments.jsx'
import Ably from '../../constants/ably'
import './sideboard.css'
import { CDBSidebar } from 'cdbreact'

class Sideboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: []
    }

    this.handleAddComment = this.handleAddComment.bind(this)
  }
  componentDidMount () {
    const channel = Ably.channels.get('comments')
    channel.attach()
    channel.once('attached', () => {
      channel.history((err, page) => {
        // create a new array with comments in reverse order (old to new)
        const comments = Array.from(page.items, item => item.data)
        this.setState({ comments })
        channel.subscribe(msg => {
          this.handleAddComment(msg.data)
        })
      })
    })
  }
  handleAddComment = comment => {
    this.setState(prevState => {
      return {
        comments: [comment].concat(prevState.comments)
      }
    })
  }
  render () {
    return (
      
        <CDBSidebar
          textColor='#101010'
          backgroundColor='#CCCCCC'
        boarderRadius='15px'
        style={{ height: '859px' ,width:'100px'}}
        >
          <Card
            style={{
              width: '200px',
              marginTop: '0px',
              marginLeft: '30px',
              height: '120px'
            }}
          >
            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '180px',
                height: '200px'
              }}
            >
              <Card.Title
                style={{ marginTop: '0px', justifyContent: 'flex-end' }}
              >
                alerts
              </Card.Title>
              <Card.Img
                variant='top'
                src={'public/user.png'}
                alt='Admin Fitra Purwaka'
                style={{
                  width: '40px',
                  height: '40px',
                  boarderRadius: '50%'
                }}
              />
              <Card.Text
                style={{
                  marginTop: '0px',
                  fontSize: '10px',
                  width: '200px'
                }}
              >
                Working on a new task,<br></br> what do you guys think?
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '200px', marginTop: '30px',height:'500px', marginLeft: '30px',}}>
            <Card.Title style={{ textAlign: 'start', fontSize: '15px' }}>
              Comments
            </Card.Title>
            <Comments comments={this.state.comments}/>
          </Card>

          <Card style={{ marginTop: '100px', width: '200px', height: '70px', marginLeft:'30px' }}>
            <Card.Title
              style={{
                textAlign: 'start',
                fontSize: '15px',
                marginBottom: '0px'
              }}
            >
              Add a comment
            </Card.Title>
            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CommentBox />
            </Card.Body>
          </Card>
        </CDBSidebar>
    )
  }
}

export default Sideboard
