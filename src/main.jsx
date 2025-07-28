import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import App from './App.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import LoginPage from './components/LoginPage.jsx';
import { loginSuccess } from './actions/loginAction';

const LoginPageWrapper = () => {
  const dispatch = useDispatch();

  const handleLoginSuccess = (userData) => {
    dispatch(loginSuccess(userData));
  };

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPageWrapper />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
