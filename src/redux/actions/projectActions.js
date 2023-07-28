import axios from 'axios'
import {
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  WORKSPACE_CREATE_REQUEST,
  WORKSPACE_CREATE_SUCCESS,
  WORKSPACE_CREATE_FAIL,
  WORKSPACE_DELETE_REQUEST,
  WORKSPACE_DELETE_SUCCESS,
  WORKSPACE_DELETE_FAIL,
  WORKSPACE_UPDATE_REQUEST,
  WORKSPACE_UPDATE_SUCCESS,
  WORKSPACE_UPDATE_FAIL,
  WORKSPACE_LIST_REQUEST
} from '../../constants/projectConstants'
import api from '../../utils/api.js'
import { useSelector } from 'react-redux'
export const createProject =
  (Project_name, description, startDate, dueDate, visibility, tasks) =>
  async dispatch => {
    try {
      dispatch({
        type: PROJECT_CREATE_REQUEST,
        payload: {
          Project_name,
          description,
          startDate,
          dueDate,
          visibility,
          tasks
        }
      })
      const formData = new URLSearchParams()
      formData.append('Project_name', Project_name)
      formData.append('description', description)
      formData.append('startDate', startDate)
      formData.append('dueDate', dueDate)
      formData.append('visibility', visibility)
      formData.append('tasks', tasks)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      const { data } = await axios.post(
        `${api}/projects/create`,
        formData.toString(),
        config
      )
      dispatch({
        type: PROJECT_CREATE_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: PROJECT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
//update project
export const updateProject =(id, startDate, dueDate, visibility, complete, priority) =>
  async dispatch => {
    try {
      dispatch({
        type: PROJECT_UPDATE_REQUEST,
        payload: { id, startDate, dueDate, visibility, complete, priority }
      })
      const userInfo = useSelector(state => state.userLogin.userInfo.token)

      const formData = new URLSearchParams()
      formData.append('startDate', startDate)
      formData.append('dueDate', dueDate)
      formData.append('visibility', visibility)
      formData.append('complete', complete)
      formData.append('priority', priority)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
         authorization: `Bearer ${userInfo}`
        }
      }
      const { data } = await axios.put(
        `${api}/projects/project/${id}`,
        formData.toString(),
        config
      )
      dispatch({
        type: PROJECT_UPDATE_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: PROJECT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const deleteProject = id => async dispatch => {
  try {
    dispatch({
      type: PROJECT_DELETE_REQUEST,
      payload: id
    })
    const { data } = await axios.delete(`${api}/projects/${id}`)
    dispatch({
      type: PROJECT_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
// create workspace
// Action Creators
export const createWorkspace =(name, type, visibility, selectedMemberNames) => async dispatch => {
    try {
      dispatch({
        type: WORKSPACE_CREATE_REQUEST,
        payload: { name, type, visibility, selectedMemberNames }
      })
      const formData = new URLSearchParams()
      formData.append('name', name)
      formData.append('type', type)
      formData.append('visibility', visibility)
      formData.append('selectedMemberNames', selectedMemberNames)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      const { data } = await axios.post(
        `${api}/workspaces/create`,
        formData.toString(),
        config
      )
      dispatch({
        type: WORKSPACE_CREATE_SUCCESS,
        payload: data
      })

      dispatch({
        type: WORKSPACE_CREATE_SUCCESS,
        payload:data
      })
    } catch (error) {
      dispatch({
        type: WORKSPACE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
