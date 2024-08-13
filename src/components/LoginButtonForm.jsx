import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { hideLogin } from '../actions/formAction';
import axios from "axios";

export default function LoginButtonForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                username,
                password,
            });

            console.log("Logged in successfully:", response.data);
            setSuccessMessage("Logged in successfully!");
            setErrorMessage("");
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Error logging in:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage("Error logging in");
            }
        }
    };






    const handleLogout = () => {
        setIsLoggedIn(false);
        setSuccessMessage("");
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <p className="text-white-500 mt-2">Welcome, {username}!</p>
                    <button onClick={handleLogout} className="mt-4 w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        Logout
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto pl-4 pr-10 bg-white rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
                        <input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Login
                    </button>
                </form>
            )}
            {successMessage && <p className="text-green-500 mt-2">Success: {successMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-2">Error: {errorMessage}</p>}
        </div>
    );
}
