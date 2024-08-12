// formActions.jsx
export const SHOW_FORM = "SHOW_FORM";
export const HIDE_FORM = "HIDE_FORM";
export const SHOW_CREATE = "SHOW_CREATE";
export const HIDE_CREATE = "HIDE_CREATE";

export const showForm = () => ({
    type: SHOW_FORM
});

export const hideForm = () => ({
    type: HIDE_FORM
});




export const showCreate = () => ({
    type: SHOW_CREATE
});

export const hideCreate = () => ({
    type: HIDE_CREATE
});
