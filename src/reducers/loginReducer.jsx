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
                username: action.payload // Set the username here directly
            };
        case LOGOUT:
            return initialState;
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload // Save the username here as well
            };
        default:
            return state;
    }
}
