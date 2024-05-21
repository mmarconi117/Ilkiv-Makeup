// store.js

import { createStore, combineReducers } from 'redux';
import currentReducer from './reducers/currentReducer'; // Import your reducer(s) here
import formReducer from './reducers/formReducer';

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  current: currentReducer,
  form: formReducer
  // Add other reducers here if you have them
});

// Create Redux store
const store = createStore(rootReducer);

export default store;
