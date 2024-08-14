

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Action to handle successful login
export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    };
};

// Action to handle logout
export const logout = () => {
    return {
        type: LOGOUT
    };
};
