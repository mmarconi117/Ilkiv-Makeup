import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

export default function CreateAccountForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/loginr", {
                username,
                password,
            });

            console.log("Logged in successfully:", response.data);
            setSuccessMessage("Logged in successfully!"); // Set success message
            setErrorMessage(""); // Clear any previous error message
            setIsLoggedIn(true); // Set isLoggedIn to true after successful registration
            // Optionally, you can redirect the user to a different page or perform additional actions
        } catch (error) {
            console.error("Error logging in", error);
            // Set a more specific error message based on the response
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Use the error message from the backend
            } else {
                setErrorMessage("Error logging in"); // Generic error message
            }
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Log out the user
        setSuccessMessage(""); // Clear success message if necessary
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto pl-4 pr-10 bg-white rounded-lg shadow-md">



                {/* Username */}
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
                {/* Password */}
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
                {/* Submit Button */}
                <button type="login" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Login
                </button>
            </form>
            {/* Success message */}
            {successMessage && <p className="text-green-500 mt-2">Success: {successMessage}</p>}
            {/* Error message */}
            {errorMessage && <p className="text-red-500 mt-2">Error: {errorMessage}</p>}
             {/* Logout Button */}
             {isLoggedIn && (
                <button onClick={handleLogout} className="mt-4 w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    Logout
                </button>
            )}
        </div>
    );
}
