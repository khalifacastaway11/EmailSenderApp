import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import SendEmail from "./Components/SendEmail";
import ScheduleEmail from "./Components/ScheduleEmail";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Register";
import EmailOptions from "./Components/NavigateOption";
import ScheduledEmails from "./Components/ScheduledEmails";
import RescheduleEmails from "./Components/RescheduleEmails"; // Correct import

import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/email-options" element={<EmailOptions />} />
              <Route
                path="/send-email"
                element={
                  <ProtectedRoute>
                    <SendEmail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/schedule-email"
                element={
                  <ProtectedRoute>
                    <ScheduleEmail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scheduled-emails"
                element={
                  <ProtectedRoute>
                    <ScheduledEmails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reschedule-email/:id"
                element={
                  <ProtectedRoute>
                    <RescheduleEmails />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;