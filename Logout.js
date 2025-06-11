//component/logout.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Optionally, make a backend call to invalidate the refresh token
    console.log("User logged out.");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Logout</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
