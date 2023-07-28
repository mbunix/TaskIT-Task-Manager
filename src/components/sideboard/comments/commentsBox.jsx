import React, { Component } from 'react'
import Ably from '../../../constants/ably'
import api from '../../../utils/api.js'
import axios from 'axios'
class CommentBox extends Component {
  constructor (props) {
    super(props)
    this.addComment = this.addComment.bind(this)
  }
  async addComment (e) {
    // Prevent the default behaviour of form submit
    e.preventDefault()
    // Get the value of the comment box
    // and make sure it not some empty strings
    const comment = e.target.elements.comment.value.trim()
    // Get the current time.
    const timestamp = Date.now()
    // Make sure name and comment boxes are filled
    // const avartar = await (
    //   await axios.get(`${api}/users/profile/avater`)
    // ).data.message
// console.log(avartar)
    if (comment) {
      const commentObject = {  comment, timestamp}
      // Publish comment
      const channel = Ably.channels.get('comments')
      channel.publish('add_comment', commentObject, err => {
        if (err) {
          console.log('Unable to publish message err = ' + err.message)
        }
      })
      // Clear input fields
      e.target.elements.comment.value = ''
    }
  }
  render () {
    return (
      <div className='comment-box' style={{ height: '150px' }}>
        <form onSubmit={this.addComment}>
          <div className='field'>
            <div className='control'>
              <input
                type='text'
                className='input'
                name='comment'
                placeholder='Add a comment'
                style={{ width: '200px', height: '20px', marginTop: '-15px' }}
              />
            </div>
            <div className='control'>
              <button
                className='button is-primary'
                style={{
                  backgroundColor: '#0d6efd',
                  width: '80px',
                  height: '20px',
                  marginTop: '-10px',
                }}
              >
                post
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default CommentBox
