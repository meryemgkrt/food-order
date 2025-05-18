import Title from "@/components/ui/Title";
import Image from "next/image";
import React, { useState } from "react";
import { addProductToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const extras = [
  {
    id: 1,
    name: "Extra 1",
    price: 2,
  },
  {
    id: 2,
    name: "Extra 2",
    price: 3,
  },
  {
    id: 3,
    name: "Extra 3",
    price: 4,
  },
];

const foodItems = [
  {
    id: 1,
    name: "Pizza 1",
    price: 10,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    extraOptions: [
      {
        id: 1,
        name: "Extra 1",
        price: 2,
      },
      {
        id: 2,
        name: "Extra 2",
        price: 3,
      },
      {
        id: 3,
        name: "Extra 3",
        price: 4,
      },
    ],
  },
];

const Index = ({ food }) => {
  const [prices, setPrices] = useState([10, 20, 30]);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log("food", food);

  const handleSizeChange = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleExtraChange = (extra, isChecked) => {
    if (isChecked) {
      setSelectedExtras((prev) => [...prev, extra]);
      changePrice(extra.price);
    } else {
      setSelectedExtras((prev) =>
        prev.filter((selected) => selected.id !== extra.id)
      );
      changePrice(-extra.price);
    }
  };

  const changePrice = (amount) => {
    setPrice((prevPrice) => prevPrice + amount);
  };

  const handleClick = () => {
    dispatch(
      addProductToCart({
        ...foodItems[0],
        extras: selectedExtras,
        price,
        quantity: 1,
      })
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center gap-10 p-5">
      <div className="relative flex-1 w-full md:w-[50%] h-[300px] md:h-[500px]">
        <Image
          src={food?.img}
          alt="Pizza Sizes"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center text-center gap-6">
        <Title className="font-dancing text-4xl md:text-6xl font-bold my-3">
          {food?.title}
        </Title>
        <span className="text-2xl font-bold text-primary underline">
          $
          {food?.prices[size] +
            selectedExtras.reduce((acc, extra) => acc + extra.price, 0)}
        </span>
        <p className="text-sm md:text-base text-dark leading-relax">
          {food?.desc}
        </p>

        <div className="flex flex-col items-center gap-4">
          <h4 className="text-xl font-bold">Choose the size</h4>
          <div className="flex justify-center items-center gap-4">
            {food?.extraOptions?.length > 0 ? (
              food.extraOptions.map((extra) => (
                <label
                  key={extra.id}
                  className="flex items-center justify-center gap-x-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedExtras.some((e) => e.id === extra.id)}
                    onChange={(e) => handleExtraChange(extra, e.target.checked)}
                    className="form-checkbox text-primary checked:bg-primary accent-primary"
                  />
                  <span className="text-sm font-semibold">{extra.name}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500">Ekstra seçenek bulunamadı</p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          {extras.map((extra) => (
            <label
              key={extra.id}
              className="flex items-center justify-center gap-x-2"
            >
              <input
                type="checkbox"
                checked={selectedExtras.some((e) => e.id === extra.id)}
                onChange={(e) => handleExtraChange(extra, e.target.checked)}
                className="form-checkbox text-primary checked:bg-primary accent-primary"
              />
              <span className="text-sm font-semibold">{extra.name}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleClick}
          className="bg-primary text-white px-9 py-2 rounded-full hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
    );
    return {
      props: {
        food: res.data || null,
        id: params.id,
      },
    };
  } catch (error) {
    return {
      props: {
        food: null,
        id: params.id,
      },
    };
  }
};

export default Index;
