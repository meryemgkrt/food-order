
import React from 'react'
import Title from '../ui/Title';

const Orders = () => {
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
                  PRODUCT ID
                </th>
                <th scope="col" className="py-3 px-6">
                  CUSTOMER
                </th>
                <th scope="col" className="py-3 px-6">
                  TOTAL
                </th>
                <th scope="col" className="py-3 px-6">
                  PAYMENT
                </th>
                <th scope="col" className="py-3 px-6">
                  STATUS
                </th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr className="transition-all bg-secondary border-gray-700 hover:bg-primary">
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>12333434...</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>Gökhan AÇIK</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  $44
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  Cash
                </td>
                <td>Preparing</td>
                <td>
                  <button className="bg-success font-semibold text-white px-2 text-[12px] py-2 rounded-lg hover:bg-green-800  transition-all">
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders
