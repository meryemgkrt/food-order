import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);

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
  }, []);

  const handleStatus = async (id) => {
    try {
      const item = orders.find((order) => order._id === id);

      if (!item) {
        console.error("Order not found");
        return;
      }

      // Status güncelleme mantığı
      const newStatus = item.status + 1 > 2 ? 2 : item.status + 1;

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        { status: newStatus }
      );

      // Lokal state'i güncelle
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );

      console.log("Order status updated:", res.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
                  ADRESS
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
                <th scope="col" className="py-3 px-6">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {order._id.substring(0, 7)}...
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {order.address}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {order.status === 0 && "Preparing"}
                    {order.status === 1 && "On the way"}
                    {order.status === 2 && "Delivered"}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    <button
                      onClick={() => handleStatus(order._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-all"
                      disabled={order.status === 2}
                    >
                      {order.status === 2 ? "Completed" : "Next Stage"}
                    </button>
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
