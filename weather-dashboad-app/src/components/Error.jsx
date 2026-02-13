import React from "react";

const Error = ({ message }) => {
  return (
    <div className="text-center text-red-500 mt-4 font-semibold">
      {message}
    </div>
  );
};

export default Error;