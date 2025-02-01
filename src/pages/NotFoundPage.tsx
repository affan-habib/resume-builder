import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-matteBlue-50 via-matteBlue-100 to-matteBlue-200 text-matteBlue-800 transition-all duration-500">
      <div className="p-10 bg-white rounded-lg shadow-2xl flex flex-col items-center max-w-lg transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-9xl font-extrabold text-matteBlue-600 animate-bounce">404</h1>
        <h2 className="text-3xl font-semibold mt-4 text-matteBlue-700">
          Oops! Page Not Found
        </h2>
        <p className="text-lg mt-4 text-center text-matteBlue-600">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-8 flex gap-6">
          <button
            onClick={handleGoBack}
            className="px-8 py-3 text-white bg-matteBlue-500 hover:bg-matteBlue-600 font-medium rounded-lg shadow-lg transition-all duration-300"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 text-matteBlue-500 border border-matteBlue-500 hover:bg-matteBlue-50 font-medium rounded-lg shadow-lg transition-all duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
