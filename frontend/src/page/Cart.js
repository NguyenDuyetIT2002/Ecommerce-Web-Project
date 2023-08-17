import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import emptyCartGif from "../assest/cartgif.gif";
import { Link } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-600">
          Sản phẩm của bạn
        </h2>
        {productCartItem[0] ? (
          <div className="my-4 flex gap-4">
            {/* Display cart items */}
            <div className="w-full max-w-3xl">
              {productCartItem.map((e1) => {
                return (
                  <CartProduct
                    key={e1._id}
                    id={e1._id}
                    name={e1.name}
                    image={e1.image}
                    category={e1.category}
                    qty={e1.qty}
                    total={e1.total}
                    price={e1.price}
                  />
                );
              })}
            </div>
            {/* total cart item */}
            <div className="w-full max-w-md ml-auto">
              <h2 className="bg-red-400 text-white p-2 text-lg text-center">
                Hóa đơn
              </h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Số lượng sản phẩm: </p>
                <p className="ml-auto w-32 font-bold">
                  <span className="">{totalQty}</span>
                </p>
              </div>

              <div className="flex w-full py-2 text-lg border-b">
                <p>Thành tiền: </p>
                <p className="ml-auto w-32 font-bold">
                  <span className="">{totalPrice}</span>
                </p>
              </div>
              <div className="flex justify-center">
                <Link
                  to={"/payment"}
                  className="bg-red-400 w-full text-lg text-white cursor-pointer font-bold py-4 text-center hover:bg-red-600 hover:tex"
                >
                  Thanh toán
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center">
              <div className="text-center">
                <img
                  src={emptyCartGif}
                  className="w-full max-w-sm ml-20 mt-20"
                  alt="emptygif"
                />
                <p className="mx-auto text-lg">
                  Oops! Bạn chưa có sản phẩm nào trong giỏ đồ. Trở về trang chủ
                  và mua sản phẩm nhé
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
