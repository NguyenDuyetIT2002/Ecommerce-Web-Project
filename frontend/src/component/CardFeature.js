import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCardItem } from "../redux/productSlice";

const CardFeature = ({ name, image, category, price, loading, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddProductToCard = () => {
    dispatch(
      addCardItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  return (
    <div
      className={`w-full min-w-[280px] max-w-[280px] bg-white drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ${
        isHovered ? "hover:shadow-lg" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image ? (
        <>
          <Link to={`/productdescription/${id}`}>
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} alt="no" className="h-full" />
            </div>
            <h3
              className="font-semibold text-slate-700 text-center capitalize text-lg h-[3em] mt-4 whitespace-nowrap overflow-hidden"
              title={name}
            >
              {name}
            </h3>
            <p className="text-center text-slate-500 font-medium">
              {price} VNĐ
            </p>
          </Link>
          <button
            className="bg-red-400 py-1 mt-2 rounded hover:bg-red-600 w-full"
            onClick={handleAddProductToCard}
          >
            Thêm vào giỏ hàng
          </button>
        </>
      ) : (
        <div className="min-h-[200px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-100 transition-opacity">
          {name}
        </div>
      )}
    </div>
  );
};

export default CardFeature;
