import React, { useState } from "react";
import Register from "./register";
import Login from "./Login";
import Footer from "./Footer";

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <button
              className={`py-2 px-4 mr-4 rounded transition duration-300 ${
                showLogin
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              className={`py-2 px-4 rounded transition duration-300 ${
                !showLogin
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setShowLogin(false)}
            >
              Register
            </button>
          </div>

          {showLogin ? <Login /> : <Register />} {/* Change this line */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;