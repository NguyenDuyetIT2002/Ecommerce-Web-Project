import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { logoutRedux } from "./userSlice";

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },

    addCardItem: (state, action) => {
      const check = state.cartItem.some((e1) => e1._id === action.payload._id);
      if (check) {
        toast("Sản phẩm đã có trong giỏ hàng", {
          duration: 1000,
        });
      } else {
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
        toast("Đã thêm sản phẩm vào giỏ", {
          duration: 800,
        });
      }
    },

    deleteCardItem: (state, action) => {
      toast("Đã xóa 1 sản phẩm", {
        duration: 1000,
      });
      const index = state.cartItem.findIndex((e1) => e1._id === action.payload);
      state.cartItem.splice(index, 1);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
    clearCartOnLogout: (state) => {
      state.cartItem = []; // Xóa sạch giỏ hàng khi đăng xuất
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutRedux, (state) => {
      state.cartItem = []; // Xóa sạch giỏ hàng khi người dùng đăng xuất
    });
  },
});

export const {
  setDataProduct,
  addCardItem,
  deleteCardItem,
  increaseQty,
  decreaseQty,
  clearCartOnLogout,
} = productSlice.actions;

export default productSlice.reducer;
