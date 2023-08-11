import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from "../redux/productSlice";
import { Link } from "react-router-dom";
import EditModal from "../component/EditModal";
import DeleteConfirmationModal from "../component/DeleteConfirmModal";
import { toast } from "react-hot-toast";

const ListProduct = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productData = useSelector((state) => state.product.productList);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/product`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const resData = await res.json();
        dispatch(setDataProduct(resData));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
        setIsLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (productId) => {
    setSelectedProductId(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/deleteProduct/${selectedProductId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = productData.filter(
        (product) => product._id !== selectedProductId
      );
      dispatch(setDataProduct(updatedData));
      setShowDeleteModal(false);
      const data = await res.json();
      toast(data.message, {
        duration: 1500,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const closeDeleteModal = () => {
    setSelectedProductId(null);
    setShowDeleteModal(false);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
  };

  const handleUpdate = async (updatedProduct) => {
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

      const updatedData = productData.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      dispatch(setDataProduct(updatedData));
      closeEditModal();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-4 flex flex-col items-center">
        Danh mục sản phẩm
      </h1>
      <div className="flex justify-between items-center mb-4 ml-6">
        <Link
          to="/admin/addproduct"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Thêm Sản Phẩm
        </Link>
        <div className="flex">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white py-2 px-4 border rounded mr-2"
          >
            <option value="all">Tất cả danh mục</option>
            <option value="quandai">Quần dài</option>
            <option value="quandui">Quần đùi</option>
            <option value="aosomi">Áo sơ mi</option>
            <option value="aokhoac">Áo khoác</option>
            <option value="aothun">Áo thun</option>
            <option value="quanjean">Quần Jean</option>
          </select>
          {/* Các nút tương tự cho các danh mục khác */}
        </div>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <td className="py-2 px-4 text-center">Tên</td>
          <td className="py-2 px-4 text-center">Loại</td>
          <td className="py-2 px-4 text-center">Ảnh</td>
          <td className="py-2 px-4 text-center">Giá</td>
          <td className="py-2 px-4 text-center">Thao tác</td>
        </thead>
        <tbody>
          {productData
            .filter(
              (product) =>
                selectedCategory === "all" ||
                product.category === selectedCategory
            )
            .map((product) => (
              <tr key={product._id} className="border-b">
                <td className="py-2 px-4 text-center">{product.name}</td>
                <td className="py-2 px-4 text-center">{product.category}</td>
                <td className="py-2 px-4 flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 "
                  />
                </td>
                <td className="py-2 px-4 text-center">{product.price}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    onClick={() => openEditModal(product)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => handleDelete(product._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedProduct && (
        <EditModal
          product={selectedProduct}
          onClose={closeEditModal}
          onUpdate={handleUpdate}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default ListProduct;
