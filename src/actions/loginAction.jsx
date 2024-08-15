// loginAction.jsx

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_USERNAME = 'SET_USERNAME';

// Action to handle successful login
export const loginSuccess = (username) => {
    return {
        type: LOGIN_SUCCESS,
        payload: username
    };
};





export const setUsername = (username) => ({
  type: SET_USERNAME,
  payload: username,
});


// Action to handle logout
export const logout = () => {
    return {
        type: LOGOUT
    };
};
