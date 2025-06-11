import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    console.log(`Updating field: ${name} => ${value}`); // ✅ Debug log
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    console.log("submitting login request with: ",formData);

    if (!formData.username || !formData.password) {
      console.error("❌ Missing username or password");
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {username:formData.username, password:formData.password},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resonse data: ",response.data);

      if (response.status === 200) {
        // Log in the user after successful login
       // const { accessToken } = response.data;
        localStorage.setItem("accessToken", response.data.accessToken);
        login();
        // Navigate to the email options page
        navigate("/email-options");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        error.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(e)=>handleChange(e)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e)=>handleChange(e)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;