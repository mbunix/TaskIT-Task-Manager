import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../../custom/message'
import Loader from '../../../../custom/loader'
import { createProject } from '../../../../redux/actions/projectActions'

import 'react-datepicker/dist/react-datepicker.css'

const schema = Yup.object().shape({
  Project_name: Yup.string().required('Project name is required'),
  description: Yup.string().required('Description is required'),
  // startDate: Yup.date().required('Start date is required'),
  // dueDate: Yup.date()
  //   .required('Due date is required')
  //   .min(Yup.ref('startDate'), 'Due date must be after start date'),
  visibility: Yup.string().required('Visibility is required'),
  tasks: Yup.string().required('Tasks is required')
})

const Project = ({ location, history }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const useProject = useSelector(state => state.projectCreate)
  const { loading, error, projectInfo } = useProject || {}
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const redirect = location?.search ? location.search.split('=')[1] : '/homepage'

  const submitHandler = data => {
    const { Project_name, description, startDate, dueDate, visibility, tasks } =
      data
    dispatch(
      createProject(
        Project_name,
        description,
       moment(startDate).format('YYYY-MM-DD'),
      moment(dueDate).format('YYYY-MM-DD'),
        visibility,
        tasks
      )
    )
    reset()
  }

  useEffect(() => {
    if (projectInfo) {
      history.push(redirect)
    }
  }, [history, projectInfo, redirect])

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form
        onSubmit={handleSubmit(submitHandler)}
        style={{ border: '2px solid black', width:'600px', marginTop:'70px', marginLeft:'40px',height:'400px',borderRadius:'15px'}}
      >
        <Form.Group as={Row} controlId='Project_name'>
          <Form.Label column sm='2'>
            Project Name:
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='text'
              {...register('Project_name')}
              placeholder='Project name'
            />
            {errors.Project_name && (
              <Form.Text className='text-danger'>
                {errors.Project_name.message}
              </Form.Text>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='description'>
          <Form.Label column sm='2'>
            Description:
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              as='textarea'
              rows={3}
              {...register('description')}
              placeholder='Description'
            />
            {errors.description && (
              <Form.Text className='text-danger'>
                {errors.description.message}
              </Form.Text>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='startDate'>
          <Form.Label column sm='2'>
            Start Date:
          </Form.Label>
          <Col sm='10'>
            <DatePicker
              selected={register('startDate').value|| null}
              onChange={date => {
                register('startDate').onChange(date) // Update the form value
              }}
              className='form-control'
              placeholderText='Start Date (yyyy-mm-dd)'
              dateFormat='yyyy-MM-dd'
            />
            {errors.startDate && (
              <Form.Text className='text-danger'>
                {errors.startDate.message}
              </Form.Text>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='dueDate'>
          <Form.Label column sm='2'>
            Due Date:
          </Form.Label>
          <Col sm='10'>
            <DatePicker
              selected={register('dueDate').value|| null}
              onChange={date => {
                register('dueDate').onChange(date) // Update the form value
              }}
              className='form-control'
              placeholderText='Due Date (yyyy-mm-dd)'
              dateFormat='yyyy-MM-dd'
            />
            {errors.dueDate && (
              <Form.Text className='text-danger'>
                {errors.dueDate.message}
              </Form.Text>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='visibility'>
          <Form.Label column sm='2'>
            Visibility:
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              as='select'
              {...register('visibility')}
              defaultValue=''
            >
              <option value='' disabled>
                Select visibility
              </option>
              <option value='public'>Public</option>
              <option value='private'>Private</option>
            </Form.Control>
            {errors.visibility && (
              <Form.Text className='text-danger'>
                {errors.visibility.message}
              </Form.Text>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='tasks'>
          <Form.Label column sm='2'>
            Tasks:
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              as='textarea'
              rows={3}
              {...register('tasks')}
              placeholder='Tasks'
            />
            {errors.tasks && (
              <Form.Text className='text-danger'>
                {errors.tasks.message}
              </Form.Text>
            )}
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' style={{backgroundColor:'blue'}}>
          Create Project
        </Button>
      </Form>
    </>
  )
}

export default Project
