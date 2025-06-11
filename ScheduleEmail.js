//component/ ScheduleEmail.js
import React, { useState } from "react";
import axios from "axios";

const ScheduleEmail = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    text: "",
    html: "",
    date: "",
  });

  const handleChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/email/schedule",
        emailData,
        {
          withCredentials: true,
        }
      );
      alert("Email scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling email", error);
      alert("Error scheduling email. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 border rounded-lg shadow-lg bg-white mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Schedule an Email
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="to"
            className="block text-sm font-medium text-gray-700"
          >
            Recipient:
          </label>
          <input
            type="email"
            id="to"
            name="to"
            value={emailData.to}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Plain Text Message:
          </label>
          <textarea
            id="text"
            name="text"
            value={emailData.text}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="html"
            className="block text-sm font-medium text-gray-700"
          >
            HTML Content (Optional):
          </label>
          <textarea
            id="html"
            name="html"
            value={emailData.html}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Schedule Time:
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={emailData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Schedule Email
        </button>
      </form>
    </div>
  );
}

export default ScheduleEmail;
