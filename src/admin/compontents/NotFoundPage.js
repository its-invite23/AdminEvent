import React from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router for navigation

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 text-lg mt-2 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/">
        <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
