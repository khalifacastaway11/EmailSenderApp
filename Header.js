import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"; // Using Heroicons for better UI

const Header = () => {
  const { logout } = useAuth();
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="p-4 bg-blue-600 dark:bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-semibold">
          <Link to="/" className="hover:underline transition-all">
            📧 Email Sender
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-lg">
          <Link to="/" className="hover:text-gray-200 transition-all">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-200 transition-all">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-200 transition-all">
            Contact
          </Link>
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-300" />
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
