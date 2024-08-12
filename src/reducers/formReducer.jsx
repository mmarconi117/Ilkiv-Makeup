import { SHOW_FORM, HIDE_FORM, SHOW_CREATE, HIDE_CREATE } from "../actions/formAction";

const initialState = {
    isFormVisible: false,
    accountVisible: false
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
        default:
            return state; // Ensure this is at the end
    }
};

export default formReducer;
