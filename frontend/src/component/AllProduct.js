import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeature";
import { useSelector } from "react-redux";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((e1) => e1.category))];
  console.log(categoryList);
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter(
      (e1) => e1.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(filter);
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

      <div className="flex gap-7 overflow-scroll scrollbar-none justify-center">
        {categoryList.length > 0 ? (
          categoryList.map((e1, index) => (
            <FilterProduct
              category={e1}
              key={index}
              isActive={e1 === filterby}
              onClick={() => handleFilterProduct(e1)}
            />
          ))
        ) : (
          <div className="min-h-[200px] flex justify-center items-center">
            <p>{"Đang load sản phẩm!..."}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {dataFilter.map((e1) => (
          <CardFeature
            key={e1._id}
            image={e1.image}
            id={e1._id}
            name={e1.name}
            category={e1.category}
            price={e1.price}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
