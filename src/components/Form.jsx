import React, { useState } from "react";
import { sendEmail } from "../api";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Only used if not logged in
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail"); // Set this at login

    const finalEmail = token ? userEmail : email;

    if (!finalEmail) {
      setErrorMessage("Email is required.");
      return;
    }

    try {
      await sendEmail(name, finalEmail, message, token);

      setSuccessMessage("Email sent successfully!");
      setErrorMessage("");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending email:", error.response?.data || error.message);
      setErrorMessage("Error sending email.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        {!localStorage.getItem("token") && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>

      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-500 mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
