import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./page/Home";
import ProductDescription from "./page/ProductDescription";
import Contact from "./page/Contact";
import Login from "./page/Login";
import Newproduct from "./page/Newproduct";
import Signup from "./page/Signup";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import AdminPage from "./page/Admin";
import ListProduct from "./page/Listproduct";
import Cart from "./page/Cart";
import Payment from "./page/Payment";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* <Route path="menu" element={<Menu />} /> */}
      <Route
        path="productdescription/:filterby"
        element={<ProductDescription />}
      />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="admin/addproduct" element={<Newproduct />} />
      <Route path="admin/listproduct" element={<ListProduct />} />
      <Route path="signup" element={<Signup />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="cart" element={<Cart />} />
      <Route path="payment" element={<Payment />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
