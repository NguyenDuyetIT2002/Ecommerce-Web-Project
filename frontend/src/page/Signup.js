import React, { useState } from "react";
import ProfileIcon from "../assest/profile-icon.png";
import { BiShow, BiHide } from "react-icons/bi";
import { FaRegHandPointRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../ultility/ImagetoBase64";
import { toast } from "react-hot-toast";

const Signup = () => {
  // Navigate after signup successful
  const navigate = useNavigate();

  // showPassword useState and handle show password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    // Đổi giá trị showPassword sang true or false
    setShowPassword((prev) => !prev);
  };

  // showConfirmPassword useState and handle show confirm password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => {
    // Đổi giá trị showConfirmPassword sang true or false
    setShowConfirmPassword((prev) => !prev);
  };
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  console.log(data);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);

    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMAIN);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = data;
    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();
        // console.log(dataRes.message);
        toast(dataRes.message);
        if (dataRes.alert) {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } else {
        toast("Mật khẩu và mật khẩu nhập lại không trùng khớp");
      }
    } else {
      toast("Hãy nhập đủ các trường thông tin!");
    }
  };
  return (
    <div className="p-4 md:p-6">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        {/* <h1 className='text-center text-2xl'>Đăng ký</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img
            src={data.image ? data.image : ProfileIcon}
            alt="Icon"
            className="w-full h-full"
          />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-200 bg-opacity-50 text-center text-sm w-full cursor-pointer">
              <p className="">Tải ảnh lên</p>
            </div>
          </label>
          <input
            type={"file"}
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleUploadImage}
          ></input>
        </div>

        {/* Signup Form */}
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">Họ</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="md-1 mb-2 w-full bg-slate-100 px-2 py-1 rounded-md outline-none focus-within:outline-blue-500 hover:outline-blue-500"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Tên</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="md-1 mb-2 w-full bg-slate-100 px-2 py-1 rounded-md outline-none focus-within:outline-blue-500 hover:outline-blue-500"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="md-1 mb-2 w-full bg-slate-100 px-2 py-1 rounded-md outline-none focus-within:outline-blue-500 hover:outline-blue-500"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Mật khẩu</label>
          <div className="flex px-2 py-1 bg-slate-100 rounded-md md-1 mb-2 outline-none focus-within:outline-blue-500 hover:outline-blue-500">
            {/* Đổi kiểu của trường mật khẩu sang text(khi ấn icon hiện mật khẩu và ngược lại) */}
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-100 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {
                // ShowPassword = true => hiển thị BiHide(icon ẩn mật khẩu) và ngược lại
                showPassword ? <BiHide /> : <BiShow />
              }
            </span>
          </div>

          <label htmlFor="confirmpassword">Nhập lại mật khẩu</label>
          <div className="flex px-2 py-1 bg-slate-100 rounded-md md-1 mb-2 outline-none focus-within:outline-blue-500 hover:outline-blue-500">
            {/* Đổi kiểu của trường mật khẩu sang text(khi ấn icon hiện mật khẩu và ngược lại) */}
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full bg-slate-100 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {
                // ShowPassword = true => hiển thị BiHide(icon ẩn mật khẩu) và ngược lại
                showConfirmPassword ? <BiHide /> : <BiShow />
              }
            </span>
          </div>
          <button
            type="submit"
            className="max-w-[150px] m-auto w-full bg-slate-200 rounded-lg hover:bg-red-500 cursor-pointer text-xl py-1 mt-4"
          >
            Đăng ký
          </button>
        </form>
        <p className="flex text-left mt-2">
          Đã có tài khoản <FaRegHandPointRight className="m-1" />{" "}
          <Link to={"/login"} className="hover:text-red-500">
            Click vô để đăng nhập nè
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
