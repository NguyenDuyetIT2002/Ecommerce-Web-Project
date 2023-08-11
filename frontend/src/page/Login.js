import React, { useState } from "react";
import ProfileIcon from "../assest/profile-icon.png";
import { BiShow, BiHide } from "react-icons/bi";
import { FaRegHandPointRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  // showPassword useState and handle show password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    // Đổi giá trị showPassword sang true or false
    setShowPassword((prev) => !prev);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(dataRes.message, {
        duration: 2000,
      });
      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
          toast("Xin chào ", {
            duration: 1000,
          });
        }, 3000);

        console.log(userData);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      }
    } else {
      toast.error("Hãy nhập đủ các trường thông tin!", {
        duration: 1500,
      });
    }
  };
  return (
    <div className="p-4 md:p-6">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        {/* <h1 className='text-center text-2xl'>Đăng ký</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img src={ProfileIcon} alt="Icon" className="w-full" />
        </div>

        {/* Signup Form */}
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="max-w-[150px] m-auto w-full bg-slate-200 rounded-lg hover:bg-red-500 cursor-pointer text-xl py-1 mt-4"
          >
            Đăng nhập
          </button>
        </form>
        <p className="flex text-left mt-2">
          Chưa có tài khoản <FaRegHandPointRight className="m-1" />{" "}
          <Link to={"/signup"} className="hover:text-red-500">
            Click vô để đăng ký nè
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
