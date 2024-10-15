import React from 'react';

const NoDataPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img 
        src="/path-to-your-image/no-data.png" 
        alt="No Data" 
        className="w-48 h-48 mb-4"
      />
      <h1 className="text-2xl font-semibold text-gray-700 mb-2">
        No Data Available
      </h1>
      <p className="text-gray-500 text-lg">
        Sorry, there is nothing to display at the moment.
      </p>
      <button
        onClick={() => window.location.reload()} 
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back To Pervious Page
      </button>
    </div>
  );
};

export default NoDataPage;
