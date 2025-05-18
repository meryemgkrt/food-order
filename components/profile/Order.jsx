import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  // const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(res.data);
        console.log("Fetched orders:", res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []); // Added empty dependency array to prevent infinite re-renders

  return (
    <div className="flex-1">
      <div className="p-8">
        <Title className="text-[32px] text-center items-center md:text-[40px] text-primary font-semibold font-dancing">
          Account Information
        </Title>
        <div className="mt-6 overflow-x-auto w-full">
          <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
            <thead className="text-xs text-white uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  ADDRESS
                </th>
                <th scope="col" className="py-3 px-6">
                  DATE
                </th>
                <th scope="col" className="py-3 px-6">
                  TOTAL
                </th>
                <th scope="col" className="py-3 px-6">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-2 justify-center">
                    <span>{order._id.slice(0, 10)}...</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    <span>{order.address}</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {order.total}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    <span>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
