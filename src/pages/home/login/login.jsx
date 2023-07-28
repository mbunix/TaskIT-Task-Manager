import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { GoogleLogin } from '@react-oauth/google'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../redux/actions/userActions.js'
import { useNavigate } from 'react-router-dom'
import './login.css'
import Message from '../../../custom/message.jsx'
import Loader from '../../../custom/loader.jsx'

const Login = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo, loading, error } = userLogin
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  }, [userInfo, history])
  const submitHandler = e => {
    e.preventDefault()
    dispatch(login(email, password))
    navigate('/homepage')
  }

  return (
    <>
      <div className='login-container'>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className='login-form'>
          <h3 className=' login-heading' style ={{color:'#FFF'}}>Log In</h3>
          <Form.Group controlId='email' className='form-control- email'>
            <Form.Label   style ={{color:'#FFF'}}>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='form-control-password'>
            <Form.Label  style ={{color:'#FFF'}}> Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Row className='py-3'>
            <Col className='signup-link'  style ={{color:'#FFF'}}>
           
              <div style={{display: 'flex',flexDirection: 'row',justifyContent:'space-around'}}>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed')
                }}
                useOneTap
              >
                Continue with Google
              </GoogleLogin>
              <Button type='submit' variant='primary' style ={{marginLeft:'20PX',width:'90px', backgroundColor:'#FFF',color:'black'}} >
  Log In
</Button>
              </div> 
                 A new user?
              <Link to='/signup'   style ={{color:'blue', marginLeft:'20PX',marginTop:'20px'}}>
                SignUp
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}
export default Login
