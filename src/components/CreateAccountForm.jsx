import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../api/api'; // Your register API
import { loginSuccess, logout } from '../actions/loginAction';

export default function CreateAccountForm() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.login.loggedIn);
  const username = useSelector(state => state.login.username);
  const email = useSelector(state => state.login.email);

  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Pass all fields to register API as needed
      const response = await register({
        firstName: fname,
        lastName: lname,
        username: usernameInput,
        password,
        email: emailInput,
      });

      // Dispatch loginSuccess with username and email from inputs or response
      dispatch(loginSuccess({
        username: usernameInput,
        email: emailInput,
      }));

      setSuccessMessage("Account created successfully!");
      setErrorMessage("");

      // Clear form
      setfName("");
      setlName("");
      setUsernameInput("");
      setPassword("");
      setConfirmPassword("");
      setEmailInput("");
    } catch (error) {
      console.error("Error creating account", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Error creating account");
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <p className="text-white mt-2">Welcome, {username} ({email})!</p>
          <button
            onClick={handleLogout}
            className="mt-4 w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto pl-4 pr-10 bg-white rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="fname" className="block text-sm font-medium text-gray-700 mb-1">
              First Name:
            </label>
            <input
              type="text"
              id="fname"
              value={fname}
              onChange={(e) => setfName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lname" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name:
            </label>
            <input
              type="text"
              id="lname"
              value={lname}
              onChange={(e) => setlName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username:
            </label>
            <input
              id="username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      )}
      {successMessage && (
        <p className="text-green-500 mt-2">Success: {successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-500 mt-2">Error: {errorMessage}</p>
      )}
    </div>
  );
}
