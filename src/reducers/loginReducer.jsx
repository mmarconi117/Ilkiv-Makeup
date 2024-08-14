// reducer.js

import { LOGIN_SUCCESS, LOGOUT } from './loginAction';

const initialState = {
    loggedIn: false,
};

export default function formReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
            };
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
            };
        default:
            return state;
    }
}
