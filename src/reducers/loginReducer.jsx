// loginReducer.jsx
import { LOGIN_SUCCESS, LOGOUT } from '../actions/loginAction'; // Corrected import statement

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
        default:
            return state;
    }
}
