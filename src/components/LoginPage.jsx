import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess }) => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isLogin) {
        const response = await login(loginId, password);
        console.log("Login response:", response.data);

        // Pass user data (username & email) to Redux
        onLoginSuccess({
          username: response.data.username,
          email: response.data.email,
        });

        setErrorMessage("");
        navigate('/');  // redirect after successful login
      } else {
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }

        await register(loginId, password, email);
        setSuccessMessage("Account created successfully! You can now log in.");
        setErrorMessage("");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed.");
      } else if (error.request) {
        setErrorMessage("Server did not respond. Check backend.");
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    }
  };

  const handleForgotPassword = async () => {
    const userEmail = prompt("Please enter your email address:");
    if (!userEmail) {
      setErrorMessage("Email is required for password reset.");
      return;
    }
    try {
      await forgotPassword(userEmail);
      setSuccessMessage("Password reset email sent.");
      setErrorMessage("");
    } catch (error) {
      console.error("Forgot password error:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
    setSuccessMessage("");
    setLoginId("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setConfirmPassword("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="loginId" className="block text-sm font-medium text-gray-700">Username or Email</label>
            <input
              id="loginId"
              type="text"
              required
              value={loginId}
              onChange={e => setLoginId(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded-md"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        {isLogin && (
          <p
            onClick={handleForgotPassword}
            className="text-blue-600 cursor-pointer mt-3 text-center"
          >
            Forgot password?
          </p>
        )}
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleForm}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
