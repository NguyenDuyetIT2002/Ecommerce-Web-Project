import React from "react";
import { PiTShirtThin } from "react-icons/pi";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick}>
      <div
        className={`text-3xl p-5  rounded-full cursor-pointer ${
          isActive ? "bg-red-400 text-slate-500 text-4xl" : "bg-slate-400"
        }`}
      >
        <PiTShirtThin />
      </div>
      <p>{category}</p>
    </div>
  );
};

export default FilterProduct;
