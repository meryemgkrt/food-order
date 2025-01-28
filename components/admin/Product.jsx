import React from 'react'
import Title from '../ui/Title';
import Image from 'next/image';

const Product = () => {
  return (
    <div className="flex-1">
      <div className="p-8">
        <Title className="text-[32px] text-center items-center md:text-[40px] text-primary font-bold font-dancing">
          Account Information
        </Title>
        <div className="mt-6 overflow-x-auto w-full">
          <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
            <thead className="text-xs text-white uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">
                  IMAGE
                </th>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  TITLE
                </th>
                <th scope="col" className="py-3 px-6">
                  PRICE
                </th>
                <th scope="col" className="py-3 px-6">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="transition-all bg-secondary border-gray-700 hover:bg-primary">
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-2 justify-center">
                 <Image src="/image/f2.png" width={50} height={50} alt="product image" className="rounded-full object-cover" />
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>12333434...</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
              <span>Goog Burger</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  $44
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <button className="btn-primary hover:bg-red-600 transition-all ">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Product
