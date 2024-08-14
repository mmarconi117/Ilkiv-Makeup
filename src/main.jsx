import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import LoginPage from './components/LoginPage.jsx';
import store from './store';
import { loginSuccess } from './actions/loginAction'; // Import your action
import './index.css';

// Create a wrapper component to handle login success
const LoginPageWrapper = () => {
  const dispatch = useDispatch();

  const handleLoginSuccess = () => {
    dispatch(loginSuccess());
    // Add any other logic you want to execute on login success
  };

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPageWrapper />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
