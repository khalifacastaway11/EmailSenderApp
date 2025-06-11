import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi"; // Import icons
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="bg-white shadow-xl rounded-xl p-10 max-w-3xl w-full text-center">
          {/* Header */}
          <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            We'd love to hear from you! Reach out using the details below.
          </p>

          {/* Contact Details */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
              <FiMail className="text-blue-600 text-2xl" />
              <span className="text-lg text-gray-700">
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:khalifacastaway@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  khalifacastaway@gmail.com
                </a>
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
              <FiPhone className="text-green-600 text-2xl" />
              <span className="text-lg text-gray-700">
                <span className="font-semibold">Phone:</span>{" "}
                <a href="tel:+2001100703468" className="text-green-500 hover:underline">
                  +20 01100703468
                </a>
              </span>
            </div>

            {/* Address */}
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
              <FiMapPin className="text-red-600 text-2xl" />
              <span className="text-lg text-gray-700">
                <span className="font-semibold">Address:</span> Ezbet ElOusaily Berak
                El-khaiam, Giza, Egypt
              </span>
            </div>
          </div>

          {/* Decorative Line */}
          <div className="w-20 h-1 bg-blue-500 my-6 mx-auto"></div>

          {/* Contact Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>

      
    </div>
  );
};

export default Contact;
