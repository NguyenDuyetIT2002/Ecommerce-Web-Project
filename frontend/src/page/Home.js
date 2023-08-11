import React, { useRef } from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrNext, GrPrevious } from "react-icons/gr";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  console.log(productData);
  const shuffledProductData = productData
    .slice()
    .sort(() => Math.random() - 0.5);
  const homeProductCardList = shuffledProductData.slice(0, 5);
  const homeTrendingProductCardList = productData
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);
  console.log(homeTrendingProductCardList);

  const loadingArray = new Array(5).fill(null);
  const loadingArrayFeature = new Array(12).fill(null);

  // handle scrolling product
  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 580;
  };
  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 580;
  };
  return (
    <div className="p-2 md:p-4 py-2">
      <div className="md:flex gap-4">
        <div className="md:w-1/2">
          <div className="flex gap-2 bg-slate-300 w-32 px-2 items-center rounded-full">
            <p className="font-md text-md text-slate-800">FREESHIP</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5952/5952766.png"
              alt=""
              className="h-6 w-6"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-4">
            Giao hàng nhanh đến <span className="text-red-600">tận nơi</span>
          </h2>
          <p className="py-3 text-base max-w-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <button className="w-1/4 h-12 font-bold bg-red-500 text-slate-200 text-lg rounded-full ml-12">
            MUA NGAY
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-0 justify-center">
          {homeProductCardList[0]
            ? homeProductCardList.map((e1) => {
                return (
                  <HomeCard
                    key={e1._id}
                    image={e1.image}
                    name={e1.name}
                    price={e1.price}
                    category={e1.category}
                  />
                );
              })
            : loadingArray.map((e1, index) => {
                return (
                  <HomeCard key={index} loading={"Đang load sản phẩm!.."} />
                );
              })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 py-4">Trending</h2>
          <div className="ml-auto flex gap-6">
            <button>
              <GrPrevious
                className="bg-slate-300 hover:bg-slate-500 text-2xl p-1 rounded"
                onClick={prevProduct}
              />
            </button>
            <button>
              <GrNext
                className="bg-slate-300 hover:bg-slate-500 text-2xl p-1 rounded"
                onClick={nextProduct}
              />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeTrendingProductCardList[0]
            ? homeTrendingProductCardList.map((e1) => {
                return (
                  <CardFeature
                    key={e1._id}
                    image={e1.image}
                    name={e1.name}
                    price={e1.price}
                    category={e1.category}
                  />
                );
              })
            : loadingArrayFeature.map((e1) => (
                <CardFeature loading={"Đang load sản phẩm !..."} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
