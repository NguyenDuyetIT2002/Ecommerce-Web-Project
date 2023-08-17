import { createSlice } from "@reduxjs/toolkit";
import { clearCartOnLogout } from "./productSlice";

const initialState = {
  email: "",
  firstName: "",
  image: "",
  lastName: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      const userData = action.payload.data;
      Object.assign(state, userData);
    },
    logoutRedux: (state, action) => {
      Object.assign(state, initialState); // Clear user data
      state.cartItem = []; // Clear cart items
      // Gọi action để xóa sạch giỏ hàng
      clearCartOnLogout(state);
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
