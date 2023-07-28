import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../../../utils/api';
import Loader from '../../../custom/loader';
import Message from '../../../custom/message';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { createWorkspace } from '../../../redux/actions/projectActions.js';

const workspaceSchema = Yup.object().shape({
  name: Yup.string().required('Workspace name is required'),
  type: Yup.string().required('Workspace type is required'),
  visibility: Yup.string().required('Visibility is required'),
  attachments: Yup.mixed().test('fileFormat', 'Invalid file format', value => {
    if (!value) return true; // No file selected is considered valid

    const allowedFormats = [
      'image/jpeg',
      'image/png',
      'application/zip', // For ZIP files
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // For .docx files
      'application/msword', // For .doc files
      'application/vnd.adobe.xd', // For .xd files
      'application/octet-stream', // For .fig files
      'text/plain' // For .txt files
    ];

    // Get the actual MIME type of the file
    const fileType = value.type;

    return allowedFormats.includes(fileType);
  }),

  assignments: Yup.array()
    .of(Yup.string().required('Member is required'))
    .required('At least one member is required'),
  newMember: Yup.string().when('assignments', {
    is: assignments => assignments.includes(''), // Check if 'Add a new member' is selected in the dropdown
    then: Yup.string().required('New member name is required')
  })
});

function Workspace() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(workspaceSchema)
  });

  const [members, setMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  // Function to handle the change of selected members in the input
  const handleMemberSelection = selectedOptions => {
    const filteredMembers = members.filter(
      member => !selectedOptions.includes(member.id)
    );
    setAvailableMembers(filteredMembers);
  };

  // Function to handle adding a new member
  const handleAddNewMember = data => {
    const newMemberName = data.newMember;

    // Check if there are already selected members
    if (data.assignments.includes('')) {
      // 'Add a new member' is already selected, do nothing
      return;
    }

    // Add a new empty option to the assignments field
    setValue('assignments', [...data.assignments, '']);
  };
  const token = useSelector(state => state.userLogin.userInfo.token);

  const fetchUsers = async () => {
    
    try {
      const res = await axios.get(`${api}/users`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });
      // Extract the names of users from the response data
      const userNames = res.data.map(user => user.name);
      setMembers(userNames);
      setAvailableMembers(userNames);
    } catch (err) {
      console.log(err);
      setMembers([]); // Empty array if there's an error or no users
    }
  };

  useEffect(() => {
  // Fetch all users from the server when the component mounts
  
    fetchUsers()

}, []);


  const dispatch = useDispatch()
  const useWorkspace = useSelector(state => state.workspaceCreate)
  const { loading, error, workspaceInfo } = useWorkspace || {}

  const handleAddWorkspace = async data => {
    // Get the selected member names from the state
    const selectedMemberNames = members.filter(member =>
      data.assignments.includes(member)
    )
const {name, type, visibility} = data
    // For the file upload (attachments)
const fileFormData = new FormData()
    fileFormData.append('file', data.attachments[0]) // Get the first file from the array

    try {
      console.log(data.attachments)

      const fileUploadResponse = await fetch('http://localhost:5000/uploads', {
        method: 'POST',
        body: fileFormData
      }).then(res => res.json())

      alert(
        `${fileUploadResponse.message}, status: ${fileUploadResponse.status}`
      )
    } catch (error) {
      console.log('File Upload Error:', error)
     
    }

    // Make the API call to create the workspace
    dispatch(createWorkspace(
      name,
      type,
      visibility,
      selectedMemberNames
    ))
    // console.log(createWorkspace)
  }

  return (
    <div
      className='workspace-form'
      style={{
        border: '2px solid black',
        height: '550px',
        width: '600px',
        marginTop: '10px',
        marginLeft: '30px',
        marginBottom: '5px',
        fontFamily: 'Noto Sans',
        borderRadius: '10px'
      }}
    >
      <h1 style={{ padding: '10px', textAlign: 'center' ,fontWeight: 'bold', fontSize: '25px',marginBottom: '-10px' }}>Create a new Workspace</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form
        onSubmit={handleSubmit(handleAddWorkspace)}
        style={{ padding: '10px', height:'300px' }}
      >
        <Form.Group controlId='name'>
          <Form.Label>Workspace name</Form.Label>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Form.Control
                type='text'
                placeholder='Enter Workspace name'
                {...field}
                isInvalid={errors.name}
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='type'>
          <Form.Label>Select Type</Form.Label>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <Form.Control as='select' {...field} isInvalid={errors.type}>
                <option value='Project'>Project</option>
                <option value='Workspace'>Workspace</option>
                <option value='Project'>Project</option>

              </Form.Control>
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.type?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='visibility'>
          <Form.Label>Visibility</Form.Label>
          <Controller
            name='visibility'
            control={control}
            render={({ field }) => (
              <Form.Control
                as='select'
                {...field}
                isInvalid={errors.visibility}
              >
                <option value='Private'>Private</option>
                <option value='Public'>Public</option>
                <option value='Private'>Private</option>

              </Form.Control>
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.visibility?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='assignments'>
          <Form.Label>Members</Form.Label>
          <Controller
            name='assignments'
            control={control}
            render={({ field }) => (
              <Form.Control
                as='select'
                multiple
                {...field}
                isInvalid={errors.assignments}
                onChange={e => {
                  const selectedOptions = Array.from(e.target.options)
                    .filter(option => option.selected)
                    .map(option => option.value)
                  setValue('assignments', selectedOptions)
                  handleMemberSelection(selectedOptions)
                }}
              >
                {/* Add an option for adding a new member */}
                <option value=''>Add members</option>
                {/* Render available members */}
                {availableMembers.map(member => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </Form.Control>
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.assignments?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {errors.assignments && errors.assignments.includes('') && (
          <Form.Group controlId='newMember'>
            <Form.Label>Add New Member</Form.Label>
            <Controller
              name='newMember'
              control={control}
              render={({ field }) => (
                <Form.Control
                  type='text'
                  placeholder='Enter New Member Name'
                  {...field}
                  isInvalid={errors.newMember}
                />
              )}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.newMember?.message}
            </Form.Control.Feedback>
            <Button type='button' onClick={handleAddNewMember}>
              Add New Member
            </Button>
          </Form.Group>
        )}

        <Form.Group controlId='attachments'>
          <Form.Label>Attachment</Form.Label>
          <Controller
            name='attachments'
            control={control}
            render={({ field }) => (
              <Form.Control
                type='file'
                onChange={e => field.onChange(e.target.files[0])}
                isInvalid={errors.attachments}
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.attachments?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type='submit'
          style={{ width: '100px', marginTop: '10px', backgroundColor: 'blue' }}
        >
          Create
        </Button>
      </Form>
    </div>
  )
}

export default Workspace
