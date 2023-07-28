import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col, Row } from 'react-bootstrap'
import Loader from '../../../../custom/loader'
import Message from '../../../../custom/message'
import 'react-datepicker/dist/react-datepicker.css'
import { updateProject } from '../../../../redux/actions/projectActions'
import './editProject.css'

function EditProject () {
  const dispatch = useDispatch()
  const useProject = useSelector(state => state.projectUpdate)
  const { loading, error, projectInfo } = useProject || {}
  const [message, setMessage] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    setValue
  } = useForm()

  const onSubmit = data => {
    // Logic to handle form submission
    const { startDate, dueDate, Priority, visibility, complete } = data
    dispatch(updateProject(startDate, dueDate, Priority, visibility, complete))
    reset()
    console.log(data)
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={handleSubmit(onSubmit)} className='edit-form'>
        {/* Render the form fields for editing the project properties */}
        <Form.Group as={Col} controlId='startDate' style={{ height: '25px' }}>
          <Form.Label column sm='6'>
            Start Date:
          </Form.Label>
          <Col
            sm='10'
            style={{ width: '130px', marginLeft: '100px', marginTop: '-36px' }}
          >
            <DatePicker
              className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
              placeholderText='Select Start Date'
              selected={getValues('startDate') || null}
              onChange={date => setValue('startDate', date)}
            />
            {errors.startDate && (
              <Form.Control.Feedback type='invalid'>
                Start Date is required
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Col} controlId='dueDate' style={{ height: '5px' }}>
          <Form.Label column sm='6'>
            Due Date:
          </Form.Label>
          <Col
            sm='10'
            style={{ width: '130px', marginLeft: '100px', marginTop: '-36px' }}
          >
            <DatePicker
              className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
              placeholderText='Select Due Date'
              selected={getValues('dueDate') || null}
              onChange={date => setValue('dueDate', date)}
            />
            {errors.dueDate && (
              <Form.Control.Feedback type='invalid'>
                Due Date is required
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Col} controlId='Priority' style={{ height: '40px' }}>
          <Form.Label
            column
            sm='6'
            style={{ color: 'black', marginTop: '40px' }}
          >
            Priority:
            <Form.Control
              as='select'
              defaultValue=''
              {...register('Priority')}
              isInvalid={errors.Priority}
              style={{
                width: '130px',
                marginLeft: '100px',
                marginTop: '-36px',
                height: '30px'
              }}
            >
              <option value='High'>High</option>
              <option value='Medium'>Medium</option>
              <option value='Low'>Low</option>
            </Form.Control>
          </Form.Label>
        </Form.Group>

        <Form.Group as={Col} controlId='visibility'>
          <Form.Label
            column
            sm='6'
            style={{ color: 'black', marginTop: '20px' }}
          >
            Visibility:
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              as='select'
              defaultValue=''
              {...register('visibility', { required: true })}
              isInvalid={errors.visibility}
              style={{
                width: '130px',
                marginLeft: '100px',
                marginTop: '-46px',
                height: '30px'
              }}
            >
              <option value='' disabled>
                Select visibility
              </option>
              <option value='public'>Public</option>
              <option value='private'>Private</option>
            </Form.Control>
            {errors.visibility && (
              <Form.Control.Feedback type='invalid'>
                Visibility is required
              </Form.Control.Feedback>
            )}
            <Form.Label style={{ marginTop: '10px' }}>
              Mark as Complete
              <Form.Check>
                <Form.Check.Input
                  type='checkbox'
                  style={{ marginLeft: '140px', padding: '-30px' }}
                />
              </Form.Check>
            </Form.Label>
          </Col>
        </Form.Group>

        <Button
          type='submit'
          variant='primary'
          style={{
            backgroundColor: 'blue',
            marginTop: '3px',
            marginLeft: '90px',
            height: '30px'
          }}
        >
          Update Project
        </Button>
      </Form>
    </>
  )
}

export default EditProject
