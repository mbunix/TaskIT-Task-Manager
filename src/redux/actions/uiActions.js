import {
    CASE_SIGNUP,
    CASE_LOGIN
} from '../../constants/uiContants.js'

export const signupCall = (onboardingSignup) => async dispatch => {
    dispatch({
        type: CASE_SIGNUP,
        payload: {
            onboardingSignup
        }
    })
}

export const loginCall = (onboardingLogin) => async dispatch => {
    dispatch({
        type: CASE_LOGIN,
        payload: {
            onboardingLogin
        }
    })
}