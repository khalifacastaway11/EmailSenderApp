import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ScheduledEmails = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/email/scheduled");
        setEmails(response.data.data);
      } catch (error) {
        setError("Failed to fetch scheduled emails.");
      }
    };

    fetchEmails();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/email/scheduled/${id}`);
      setEmails(emails.filter((email) => email._id !== id));
    } catch (error) {
      setError("Failed to cancel the email.");
    }
  };

  const handleReschedule = (id) => {
    navigate(`/reschedule-email/${id}`);
  };

  return (
    <div className="max-w-lg mx-auto p-8 border rounded-lg shadow-lg bg-white dark:bg-gray-800 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 dark:text-white">
        Scheduled Emails
      </h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <ul>
        {emails.map((email) => (
          <li key={email._id} className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p><strong>To:</strong> {email.to}</p>
                <p><strong>Subject:</strong> {email.subject}</p>
                <p><strong>Date:</strong> {new Date(email.date).toLocaleString()}</p>
              </div>
              <div>
                <button
                  onClick={() => handleReschedule(email._id)}
                  className="py-1 px-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => handleCancel(email._id)}
                  className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduledEmails;