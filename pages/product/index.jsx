import Title from "@/components/ui/Title";
import Image from "next/image";
import React, { useState } from "react";
import { addProductToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

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

const Index = () => {
  const [prices, setPrices] = useState([10, 20, 30]);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const cart = useSelector((state) => state.cart);
  
  const dispatch = useDispatch();

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
  console.log(cart);

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center gap-10 p-5">
      <div className="relative flex-1 w-full md:w-[50%] h-[300px] md:h-[500px]">
        <Image
          src="/image/size.png"
          alt="Pizza Sizes"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center text-center gap-6">
        <Title className="font-dancing text-4xl md:text-6xl font-bold my-3">
          Gold Pizza
        </Title>
        <span className="text-2xl font-bold text-primary underline">
          ${price}
        </span>
        <p className="text-sm md:text-base text-dark leading-relax">
          Veniam debitis quaerat officiis quasi cupiditate quo.
        </p>

        <div className="flex flex-col items-center gap-4">
          <h4 className="text-xl font-bold">Choose the size</h4>
          <div className="flex justify-center items-center gap-12">
            <div
              className="relative w-10 h-10 md:w-12 md:h-12 hover:scale-110 transition-all cursor-pointer"
              onClick={() => handleSizeChange(0)}
            >
              <Image
                src="/image/size.png"
                alt="Small Pizza Size"
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
              <span className="top-0 font-medium -right-8 absolute bg-primary text-xs px-[5px] rounded-full">
                Small
              </span>
            </div>

            <div
              className="relative w-14 h-14 md:w-14 md:h-14 hover:scale-110 transition-all cursor-pointer"
              onClick={() => handleSizeChange(1)}
            >
              <Image
                src="/image/size.png"
                alt="Medium Pizza Size"
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
              <span className="top-0 font-medium -right-8 absolute bg-primary text-xs px-[5px] rounded-full">
                Medium
              </span>
            </div>

            <div
              className="relative w-[70px] h-[70px] md:w-16 md:h-16 hover:scale-110 transition-all cursor-pointer"
              onClick={() => handleSizeChange(2)}
            >
              <Image
                src="/image/size.png"
                alt="Large Pizza Size"
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
              <span className="top-0 font-medium -right-6 absolute bg-primary text-xs px-[8px] rounded-full">
                Large
              </span>
            </div>
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

export default Index;
