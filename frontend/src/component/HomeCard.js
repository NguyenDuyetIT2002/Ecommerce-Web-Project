import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ name, image, category, price, loading, id }) => {
  return (
    <div className="p-2 rounded bg-white shadow-md item min-w-[180px] max-w-">
      {name ? (
        <>
          <Link
            to={`/productdescription/${id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
          >
            <div className="w-48 min-h-[150px]">
              <img src={image} className="w-full h-full" alt={name} />
              <h3 className="font-semibold text-slate-700 text-center capitalize text-lg">
                {name}
              </h3>
              <p className="text-center text-slate-500 font-medium">
                {price} VNĐ
              </p>
            </div>
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default HomeCard;
