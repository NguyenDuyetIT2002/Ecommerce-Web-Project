import React, { useState, useEffect, useRef } from "react";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Hiển thị toast "Bạn sẽ được đăng xuất sau vài giây"
      toast("Bạn sẽ đăng xuất sau vài giây", {
        duration: 2000,
      });

      // Đợi 2 giây trước khi thực hiện logout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Thực hiện logout
      dispatch(logoutRedux());

      // Hiển thị toast "Bạn đã đăng xuất"
      toast("Bạn đã đăng xuất!", {
        duration: 1500,
      });
    } catch (error) {
      console.error("Có lỗi xảy ra trong quá trình đăng xuất:", error);
    }
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  console.log(process.env.REACT_APP_ADMIN_EMAIL);
  return (
    <header className="fixed shadow-md w-full h-18 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        {/* Logo cửa hàng */}
        <Link to={""}>
          <div className="h-14">
            <img src={logo} className="h-full" alt="Logo" />
          </div>
        </Link>

        {/* Thanh điều hướng */}
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="gap-3 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""} className="px-2 py-1">
              Trang chủ
            </Link>
            <Link to={"contact"} className="px-2 py-1">
              Liên hệ
            </Link>
          </nav>
          <div className="text-2xl text-slate-500 relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className=" text-slate-500" ref={menuRef}>
            <div
              className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden"
              onClick={handleShowMenu}
            >
              {userData.image ? (
                <img
                  src={userData.image}
                  alt={"none"}
                  className="h-full w-full"
                />
              ) : (
                <HiOutlineUserCircle className="h-full w-full" />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.image ? (
                  <p
                    className="cursor-pointer hover:bg-red-300"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </p>
                ) : (
                  <>
                    <Link
                      to={"login"}
                      className="whitespace-nowrap cursor-pointer hover:bg-red-300"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to={"signup"}
                      className="whitespace-nowrap cursor-pointer hover:bg-red-300"
                      id="signup"
                    >
                      Đăng ký
                    </Link>
                    <nav className="text-base md:text-lg flex flex-col md:hidden">
                      <Link to={""} className="px-2 py-1">
                        Trang chủ
                      </Link>
                      <Link to={"contact"} className="px-2 py-1">
                        Liên hệ
                      </Link>
                    </nav>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}
    </header>
  );
};

export default Header;
