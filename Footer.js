import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Email Sender App. All Rights
          Reserved.
        </p>
        <p>
          Built with <span className="text-red-500">❤️</span> by Ahmed Khalifa.
        </p>
      </div>
    </footer>
  );
};

export default Footer;