import React from "react";

const Allert = ({ error }) => {
  return (
    <div
      className={`w-full max-w-lg h-16 rounded-lg mt-2 overflow-hidden text-lg font-medium`}
    >
      {error && (
        <div className="w-full h-full flex justify-center items-center bg-rose-700">
          <h2>{error}</h2>
        </div>
      )}
    </div>
  );
};

export default Allert;
