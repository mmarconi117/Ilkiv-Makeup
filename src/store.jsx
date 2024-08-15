// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default to localStorage
import { combineReducers } from 'redux';
import currentReducer from './reducers/currentReducer';
import formReducer from './reducers/formReducer';
import loginReducer from './reducers/loginReducer';

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  current: currentReducer,
  form: formReducer,
  user: loginReducer,
  // Add other reducers here if you have them
});

// Configure redux-persist
const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can blacklist or whitelist specific reducers
  // blacklist: ['form'], // example to exclude form reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
const store = createStore(persistedReducer);

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
