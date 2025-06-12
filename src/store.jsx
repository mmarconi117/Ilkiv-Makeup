// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default to localStorage
import { combineReducers } from 'redux';
import currentReducer from './reducers/currentReducer';
import formReducer from './reducers/formReducer';
import loginReducer from './reducers/loginReducer';


const rootReducer = combineReducers({
  current: currentReducer,
  form: formReducer,
  user: loginReducer,

});

// Configure redux-persist
const persistConfig = {
  key: 'root',
  storage,

};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
const store = createStore(persistedReducer);

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
