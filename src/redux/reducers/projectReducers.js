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
    WORKSPACE_LIST_REQUEST,
    WORKSPACE_LIST_SUCCESS,
    WORKSPACE_LIST_FAIL
} from '../../constants/projectConstants.js'

export const projectCreateReducer =(state= {}, action)=>{
    switch(action.type){
        case PROJECT_CREATE_REQUEST:
            return {loading: true}
        case PROJECT_CREATE_SUCCESS:
            return {loading: false, projectInfo: action.payload}
        case PROJECT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
//PROJECT UPDATE 
export const projectUpdateReducer =(state= {}, action)=>{
    switch(action.type){
        case PROJECT_UPDATE_REQUEST:
            return {loading: true}
        case PROJECT_UPDATE_SUCCESS:
            return {loading: false, projectInfo: action.payload}
        case PROJECT_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const projectDeleteReducer =(state= {}, action)=>{
    switch(action.type){
        case PROJECT_DELETE_REQUEST:
            return {loading: true}
        case PROJECT_DELETE_SUCCESS:
            return {loading: false, projectInfo: action.payload}
        case PROJECT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

//workspace  create reducer 
export const workspaceCreateReducer =(state= {}, action)=>{
    switch(action.type){
        case WORKSPACE_CREATE_REQUEST:
            return {loading: true}
        case WORKSPACE_CREATE_SUCCESS:
            return {loading: false, workspaceInfo: action.payload}
        case WORKSPACE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

// workspace list reducer
export const workspaceListReducer =(state= {}, action)=>{
    switch(action.type){
        case WORKSPACE_LIST_REQUEST:
            return {loading: true}
        case WORKSPACE_LIST_SUCCESS:
            return {loading: false, workspaceInfo: action.payload}
        case WORKSPACE_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}