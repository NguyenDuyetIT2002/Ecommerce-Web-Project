import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../ultility/ImagetoBase64";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data)
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, category, price } = data;
    if (name && image && category && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const fetchRes = await fetchData.json();

      toast(fetchRes.message);

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Hãy nhập đủ trường thông tin!", {
        duration: 1500,
      });
    }
  };
  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 "
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Tên</label>
        <input
          type={"text"}
          name="name"
          className="outline-none focus-within:outline-blue-500 hover:outline-blue-500 bg-slate-300 rounded-sm"
          onChange={handleOnChange}
          value={data.name}
        ></input>

        <label htmlFor="type" className="mt-3">
          Loại
        </label>
        <select
          className="mt-5 mb-5 bg-slate-300 outline-none focus-within:outline-blue-500 hover:outline-blue-500 rounded-sm"
          name="category"
          id="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>Chọn loại mặt hàng!</option>
          <option value={"quandai"}>Quần dài</option>
          <option value={"quandui"}>Quần đùi</option>
          <option value={"aosomi"}>Áo sơ mi</option>
          <option value={"aokhoac"}>Áo khoác</option>
          <option value={"aothun"}>Áo thun</option>
          <option value={"quanjean"}>Quần Jean</option>
        </select>

        <label htmlFor="image">
          Ảnh
          <div className="h-40 w-full bg-slate-300 my-3 flex items-center justify-center cursor-pointer rounded-sm">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              id="image"
              onChange={uploadImage}
              className="hidden"
              accept="img/*"
            ></input>
          </div>
        </label>

        <label htmlFor="price">Giá</label>
        <input
          type={"text"}
          name="price"
          className="mt-5 mb-5 bg-slate-300 outline-none focus-within:outline-blue-500 hover:outline-blue-500 rounded-sm"
          onChange={handleOnChange}
          value={data.price}
        ></input>

        <label htmlFor="description">Mô tả</label>
        <textarea
          rows={2}
          name="description"
          className="mt-5 mb-5 bg-slate-300 outline-none focus-within:outline-blue-500 hover:outline-blue-500 resize-none rounded-sm"
          onChange={handleOnChange}
          value={data.description}
        ></textarea>
        <div className="flex gap-1">
          <Link
            to={"/admin/listproduct"}
            className="max-w-[200px] m-auto w-full bg-slate-200 hover:bg-red-500 cursor-pointer text-xl py-1 text-center mt-4 rounded-sm"
          >
            Danh sách sản phẩm
          </Link>
          <button
            type="submit"
            className="max-w-[150px] m-auto w-full bg-slate-200 hover:bg-red-500 cursor-pointer text-xl py-1 mt-4 rounded-sm"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default Newproduct;
