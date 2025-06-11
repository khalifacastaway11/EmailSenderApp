import React from "react";
import { useNavigate } from "react-router-dom";

const EmailOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Choose an Option
      </h2>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/send-email")}
          className="py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          📩 Send Email
        </button>
        <button
          onClick={() => navigate("/schedule-email")}
          className="py-3 px-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          ⏳ Schedule Email
        </button>
        <button
          onClick={() => navigate("/scheduled-emails")}
          className="py-3 px-6 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all"
        >
          📅 View Scheduled Emails
        </button>
      </div>
    </div>
  );
};

export default EmailOptions;
