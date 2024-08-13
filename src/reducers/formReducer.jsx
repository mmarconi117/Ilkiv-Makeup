import { SHOW_FORM, HIDE_FORM, SHOW_CREATE, HIDE_CREATE } from "../actions/formAction";
import {SHOW_LOGIN, HIDE_LOGIN} from "../actions/formAction"

const initialState = {
    isFormVisible: false,
    accountVisible: false,
    loginVisible: false

};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_FORM:
            return {
                ...state,
                isFormVisible: true
            };
        case HIDE_FORM:
            return {
                ...state,
                isFormVisible: false
            };
        case SHOW_CREATE:
            return {
                ...state,
                accountVisible: true
            };
        case HIDE_CREATE:
            return {
                ...state,
                accountVisible: false // Set to false when hiding create account
            };
        case SHOW_LOGIN:
            return {
                ...state,
                loginVisible: true
            };
        case HIDE_LOGIN:
            return {
                ...state,
                loginVisible: false
            };
        default:
            return state; // Ensure this is at the end
    }
};

export default formReducer;
