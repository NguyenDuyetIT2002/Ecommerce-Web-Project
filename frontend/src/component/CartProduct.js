import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  deleteCardItem,
  increaseQty,
  decreaseQty,
} from "../redux/productSlice";

const CartProduct = ({ id, image, name, category, qty, total, price }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-200 p-2 flex gap-3 rounded border-2 border-slate-300">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className="h-30 w-28 object-cover " alt="none" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl mt-3">
            {name}
          </h3>
          <div
            className="cursor-pointer hover:text-red-500"
            onClick={() => dispatch(deleteCardItem(id))}
          >
            <AiFillDelete />
          </div>
        </div>
        <p className=" text-slate-500  font-medium text-md">{category}</p>
        <p className=" font-bold text-base">
          <span>{price}</span>
          <span className=""> VNĐ</span>
        </p>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => dispatch(increaseQty(id))}
              className="bg-red-400 py-1 mt-2 rounded hover:bg-red-600 p-1 "
            >
              <TbPlus />
            </button>
            <p className="font-semibold p-1 mt-1">{qty}</p>
            <button
              onClick={() => dispatch(decreaseQty(id))}
              className="bg-red-400 py-1 mt-2 rounded hover:bg-red-600 p-1 "
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold mt-2">
            <p>Tổng: </p>
            <p>{total} VNĐ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
