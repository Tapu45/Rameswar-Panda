import React from "react";

const Loading = ({ text = "Loading..." }) => (
  <div className="w-full flex flex-col items-center justify-center py-16">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
    <p className="text-blue-300 text-lg">{text}</p>
    <p className="text-blue-400 text-xs mt-2">Please wait, fetching data from server.</p>
  </div>
);

export default Loading;