// loginReducer.jsx
import { LOGIN_SUCCESS, LOGOUT, SET_USERNAME } from '../actions/loginAction'; // Corrected import statement

const initialState = {
    loggedIn: false,
    username: ''
};

export default function loginReducer(state = initialState, action) {
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
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload, // Save the username
            };
            case LOGOUT:
                return initialState;
        default:
            return state;
    }
}
