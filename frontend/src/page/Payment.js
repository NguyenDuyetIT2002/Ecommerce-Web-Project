import React from "react";
import WorkInProgress from "../assest/wip.gif";

const Payment = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={WorkInProgress} alt="Work in Progress" className="mb-4 w-64" />
      <h1 className="text-xl font-semibold text-gray-800">
        Chức năng đang phát triển, quay lại sau nhé!
      </h1>
    </div>
  );
};

export default Payment;
