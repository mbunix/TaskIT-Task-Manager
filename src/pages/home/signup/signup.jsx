import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import * as yup from 'yup'
import Loader from '../../../custom/loader.jsx'
import Message from '../../../custom/message.jsx'
import { SignUp } from '../../../redux/actions/userActions.js'
import Login from '../login/login.jsx'
import './signup.css'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
    .required(),
  email: yup.string().required()
})

const Signup = ({ location, history }) => {
  const {
    register,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })
  const useSignup = useSelector(state => state.userSignUp)
  const useDisplayLogin = useSelector(state => state.loginCall)
  const navigate = useNavigate()
  const { loading, error, userInfo } = useSignup || useDisplayLogin || {}
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [message, setMessage] = useState(null)
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    letter: false,
    number: false
  })
  const redirect = location?.search ? location.search.split('=')[1] : '/login'
  const dispatch = useDispatch()

  const handlePasswordChange = e => {
    const password = e.target.value
    setPasswordStrength({
      length: password.length >= 8,
      letter: /[A-Za-z]/.test(password),
      number: /\d/.test(password)
    })
  }
  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const submitHandler = e => {
    e.preventDefault()
    if (
      !passwordStrength.length ||
      !passwordStrength.letter ||
      !passwordStrength.number
    ) {
      setMessage('Password is too weak')
    } else {
      if (!email) {
        setMessage('Email is required')
      }
      dispatch(SignUp(name, password, email))
      console.log(name, password, email)
      reset()
    }
    navigate('/homepage')
    setShowLogin(false)
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return (
    <>
      {loading && <Loader />}
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {!showLogin ? (
      <Form className='signup-form' onSubmit={submitHandler}>
        <h2 style={{fontWeight: 'bold',fontSize:'30px',color: '#FFF'}}>Sign Up</h2>
        <Form.Group controlId='name' className='name'>
          <Form.Label  style={{color:'#FFF'}}>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='UserName'
            {...register('username', { required: 'Username is required' })}
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{color:'#FFF'}}>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
            onChange={e => {
              handlePasswordChange(e)
              setPassword(e.target.value)
            }}
            value={password}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </Form.Group>
        <div className='password-strength'>
          <span  style={{color:'#FFF'}}>Password Strength</span>
          <label  style={{color:'#FFF'}}>
            <input
              className='checkbox-auth'
              type='checkbox'
              checked={passwordStrength.length}
                disabled
                 style={{color:'#FFF'}}
            />
            At least 8 characters
          </label>
          <label  style={{color:'#FFF'}}>
            <input
              className='checkbox-auth'
              type='checkbox'
              checked={passwordStrength.letter}
                disabled
                 style={{color:'#FFF'}}
            />
            Contains a letter
          </label>
        </div>
        {errors.password && (
          <p role='alert' style={{ display: 'flex', flexDirection: 'column',color:'#FFF' }}>
            Password must contain at least 8 characters, one letter and one
            number
          </p>
        )}

        <Form.Group>
          <Form.Label  style={{color:'#FFF'}}>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            {...register('confirmPassword', {
              required: 'Confirm Password is required'
            })}
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label  style={{color:'#FFF'}}>Enter a valid Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            value={email}
            onChange={handleEmailChange}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </Form.Group>
        <Button type='submit' style={{marginTop:'20px', marginBottom:'20px'}}>SignUp</Button>
        <span  style={{color:'#FFF'}}>
          Have an Account?{' '}
          <Button
            type='button'
            className='login- button'
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>
        </span>
        </Form>
      ) : (
        <Login />
      )
      }
    </>
  )
}

export default Signup
