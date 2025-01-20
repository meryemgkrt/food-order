import Title from "@/components/ui/Title";
import Image from "next/image";
import React from "react";

const Cart = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      {/* Tablo */}
      <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
          <thead className="text-xs text-white uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                PRODUCT
              </th>
              <th scope="col" className="py-3 px-6">
                EXTRAS
              </th>
              <th scope="col" className="py-3 px-6">
                PRICE
              </th>
              <th scope="col" className="py-3 px-6">
                QUANTITY
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="transition-all bg-secondary border-gray-700 hover:bg-primary">
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-2 justify-center">
                <Image src="/image/f1.png" alt="Good Pizza" width={50} height={50} />
                <span>Good Pizza</span>
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                <span>Mayonez, Acı Sos, Ketçap</span>
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                $20
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                1
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sepet Toplamı */}
      <div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full md:text-start text-center">
        <Title className="text-[40px] font-dancing text-primary font-bold ">CART TOTAL</Title>

        <div className="mt-6">
          <div className="flex justify-between">
            <b>Subtotal: </b>
            <span>$20</span>
          </div>
          <div className="flex justify-between mt-2">
            <b>Discount: </b>
            <span>$0</span>
          </div>
          <div className="flex justify-between mt-2 font-bold">
            <b>Total: </b>
            <span>$20</span>
          </div>
        </div>

        <div>
          <button className="btn-primary mt-4 md:w-auto w-52">CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
