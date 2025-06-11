import React from "react";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="bg-white shadow-xl rounded-xl p-10 max-w-3xl text-center">
          {/* Header Section */}
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-6">
            Get to know our mission and how we are revolutionizing email management.
          </p>

          {/* Image or Icon (Optional) */}
          <div className="flex justify-center my-6">
            <img 
              src="https://source.unsplash.com/400x200/?technology,email" 
              alt="Email Illustration" 
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            Welcome to our{" "}
            <span className="text-blue-600 font-semibold">
              Email Sender App
            </span>! Our mission is to make email scheduling and sending effortless
            for users around the globe. Built with cutting-edge technology, we
            ensure an intuitive and efficient user experience.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mt-4 text-justify">
            Whether you're sending one email or a thousand, our platform offers
            the tools you need to stay organized and on top of your communication.
            Join us on this journey to revolutionize email management!
          </p>

          {/* Decorative Line */}
          <div className="w-20 h-1 bg-blue-500 my-6 mx-auto"></div>

          {/* Call to Action */}
          <a 
            href="/contact" 
            className="inline-block bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </main>

      
    </div>
  );
};

export default About;

