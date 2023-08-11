import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [adminCode, setAdminCode] = useState("");
  const navigate = useNavigate();

  const handleCodeChange = (e) => {
    setAdminCode(e.target.value);
  };

  const handleConfirm = () => {
    // Kiểm tra mã admin
    if (adminCode === "100000") {
      // Mã đúng, chuyển hướng đến trang admin/addproduct
      navigate("/admin/addproduct");
    } else {
      // Mã sai, xử lý theo yêu cầu của bạn (ví dụ: thông báo lỗi)
      console.log("Mã admin không đúng");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center mt-6 mb-4 text-3xl">Trang Admin</h1>
      <h2 className="text-center mt-6 mb-4 text-2xl">
        Hãy nhập mã xác nhận để được điều hướng tới trang thêm sản phẩm của
        Admin
      </h2>
      <div>
        <label htmlFor="adminCode" className="text-center mb-2 text-lg  ">
          Mã admin:
        </label>
        <input
          type="password"
          id="adminCode"
          value={adminCode}
          onChange={handleCodeChange}
          className="px-2 py-1 mb-2 rounded-md outline-none focus-within:outline-blue-500 hover:outline-blue-500"
        />
        <button
          onClick={handleConfirm}
          className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md text-lg"
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
