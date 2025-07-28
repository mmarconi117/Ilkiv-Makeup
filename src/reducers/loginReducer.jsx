import { LOGIN_SUCCESS, LOGOUT } from '../actions/loginAction';

const initialState = {
  loggedIn: false,
  username: '',
  email: '',
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        email: action.payload.email,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
