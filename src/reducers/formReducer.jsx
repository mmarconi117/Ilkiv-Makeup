// formReducer.jsx
import { SHOW_FORM, HIDE_FORM } from "../actions/formAction";

const initialState = {
    isFormVisible: false
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
        default:
            return state;
    }
};

export default formReducer;
