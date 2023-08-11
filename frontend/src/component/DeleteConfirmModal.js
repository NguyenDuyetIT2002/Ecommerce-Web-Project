import React from "react";

const DeleteConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-4 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Xác nhận xóa</h2>
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-1 px-4 rounded mr-2"
          >
            Xóa
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

export default DeleteConfirmationModal;
