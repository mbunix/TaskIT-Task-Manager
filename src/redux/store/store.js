import { createStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import { projectCreateReducer,projectUpdateReducer} from '../reducers/projectReducers.js';
import { userLoginReducer, userSignUpReducer } from '../reducers/userReducers.js';
import { workspaceCreateReducer, workspaceListReducer } from '../reducers/projectReducers.js';
// import { signUpCallReducer, loginCallReducer } from '../reducers/uiReducers.js';
const reducer = combineReducers(
    {
        userSignUp: userSignUpReducer,
        userLogin: userLoginReducer,
        projectCreate: projectCreateReducer,
        workspaceCreate: workspaceCreateReducer,
        workspaceList: workspaceListReducer,
        projectUpdate: projectUpdateReducer
    }
)
const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
}

const middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
)
export default store 