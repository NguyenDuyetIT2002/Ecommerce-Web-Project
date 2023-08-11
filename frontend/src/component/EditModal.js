import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { ImagetoBase64 } from "../ultility/ImagetoBase64";
import { BsCloudUpload } from "react-icons/bs";

const EditModal = ({ product, onClose, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      ImagetoBase64(image).then((data) => {
        setSelectedImage(data); // Lưu trữ dữ liệu hình ảnh đã chọn
        setUpdatedProduct((prevProduct) => ({
          ...prevProduct,
          image: data,
        }));
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/updateProduct/${updatedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      onUpdate(updatedProduct);
      onClose();
      toast(data.message, {
        duration: 1500,
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-4 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Sửa Sản Phẩm</h2>
        <label className="block mb-2">
          Tên:
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={handleInputChange}
            className="block w-full border rounded py-1 px-2"
          />
        </label>

        <label className="block mb-2">
          Danh mục:
          <select
            name="category"
            value={updatedProduct.category}
            onChange={handleInputChange}
            className="block w-full border rounded py-1 px-2"
          >
            <option value={"other"}>Chọn loại mặt hàng!</option>
            <option value={"quandai"}>Quần dài</option>
            <option value={"quandui"}>Quần đùi</option>
            <option value={"aosomi"}>Áo sơ mi</option>
            <option value={"aokhoac"}>Áo khoác</option>
            <option value={"aothun"}>Áo thun</option>
            <option value={"quanjean"}>Quần Jean</option>
          </select>
        </label>

        <label className="block mb-2">
          Ảnh:
          <div className="h-40 w-full bg-slate-300 my-3 flex items-center justify-center cursor-pointer rounded-sm">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </label>

        <label className="block mb-2">
          Giá
          <input
            type="text"
            name="price"
            value={updatedProduct.price}
            onChange={handleInputChange}
            className="block w-full border rounded py-1 px-2"
          />
        </label>

        <label className="block mb-2">
          Mô tả:
          <textarea
            rows={2}
            name="description"
            value={updatedProduct.description}
            onChange={handleInputChange}
            className="block w-full border rounded py-1 px-2"
          />
        </label>

        {/* Add other input fields for editing other properties */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-1 px-4 rounded mr-2"
          >
            Lưu
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-1 px-4 rounded"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
