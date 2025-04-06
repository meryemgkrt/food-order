import Title from "@/components/ui/Title";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      {/* Ürünler Tablosu */}
      <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
          <thead className="text-xs text-white uppercase bg-gray-700">
            <tr>
              <th className="py-3 px-6">PRODUCT</th>
              <th className="py-3 px-6">EXTRAS</th>
              <th className="py-3 px-6">PRICE</th>
              <th className="py-3 px-6">QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            {cart.products?.map((product, index) => (
              <tr
                key={index}
                className="transition-all bg-secondary border-gray-700 hover:bg-primary"
              >
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-2 justify-center">
                  <Image
                    src="/image/f1.png"
                    alt="Product Image"
                    width={50}
                    height={50}
                  />
                  <span>{product.name}</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {product.extras?.length > 0 ? (
                    product.extras.map((item) => (
                      <span
                        key={item.id}
                        className="block text-xs text-gray-400"
                      >
                        {item.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">No extras</span>
                  )}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  ${product.price}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {product.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sepet Özeti */}
      <div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full md:text-start text-center">
        <Title className="text-[40px] font-dancing text-primary font-bold">
          CART TOTAL
        </Title>

        <div className="mt-6">
          <div className="flex justify-between">
            <b>Subtotal: </b>
            <span>${cart.total}</span>
          </div>
          <div className="flex justify-between mt-2">
            <b>Discount: </b>
            <span>$0</span>
          </div>
          <div className="flex justify-between mt-2 font-bold">
            <b>Total: </b>
            <span>${cart.total}</span>
          </div>
        </div>

        <button
          onClick={() => dispatch(reset())}
          className="bg-primary text-white px-6 py-2 rounded-full mt-4 hover:opacity-90 transition"
        >
          CHECKOUT NOW!
        </button>
      </div>
    </div>
  );
};

export default Cart;
