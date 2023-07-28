import {
    CASE_SIGNUP,
    CASE_LOGIN
} from '../../constants/uiContants.js'

export const signUpCallReducer = (state = {}, actions) => {
    switch (actions.type) {
        case CASE_SIGNUP:
            return { loading: true };
        case CASE_SIGNUP:
            return { loading: false};
        case CASE_SIGNUP:
            return { loading: false, error: actions.payload };
        default:
            return state;
    }
}
export const loginCallReducer = (state = {}, actions) => {
    switch (actions.type) {
        case CASE_LOGIN:
            return { loading: true };
        case CASE_LOGIN:
            return { loading: false};
        case CASE_LOGIN:
            return { loading: false, error: actions.payload };
        default:
            return state;
    }
}