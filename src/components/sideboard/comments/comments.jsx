import React, { Component } from 'react'
import Comment from './comment'

class Comments extends Component {
  render () {
    const { comments } = this.props

    if (!comments || comments.length === 0) {
      return null // or return a message indicating no comments
    }

    return (
      <section className='section' style={{ marginTop: '-10px' ,justifyContent: 'start',width:'20px',height:'4px'}}>
        {comments.map((comment, index) => (
          <Comment key={comment.timestamp} comment={comment} />
        ))}
      </section>
    )
  }
}

export default Comments
