import React, { useEffect, useState } from "react";

// Mock Title component
const Title = ({ children, className }) => (
  <h1 className={className}>{children}</h1>
);

// Mock axios
const axios = {
  get: async (url) => {
    // Mock data
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      data: [
        {
          _id: "64f8b2a3c4d5e6f7g8h9i0j1",
          address: "123 Main St, Istanbul",
          createdAt: "2024-01-15T10:30:00Z",
          total: 45.5,
          status: "Delivered",
        },
        {
          _id: "64f8b2a3c4d5e6f7g8h9i0j2",
          address: "456 Oak Ave, Ankara",
          createdAt: "2024-01-14T14:20:00Z",
          total: 32.75,
          status: "In Progress",
        },
        {
          _id: "64f8b2a3c4d5e6f7g8h9i0j3",
          address: "789 Pine Rd, Izmir",
          createdAt: "2024-01-13T09:15:00Z",
          total: 28.9,
          status: "Pending",
        },
      ],
    };
  },
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(res.data);
        console.log("Fetched orders:", res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Sipariş detayını gösterme fonksiyonu
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  // Modal kapatma
  const closeModal = () => {
    setSelectedOrder(null);
  };

  // Status badge renk belirleme
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex-1">
        <div className="p-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="p-8">
        <Title className="text-[32px] text-center items-center md:text-[40px] text-orange-600 font-semibold font-dancing">
          Order History
        </Title>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto w-full">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
                <thead className="text-xs text-white uppercase bg-gradient-to-r from-orange-600 to-amber-600">
                  <tr>
                    <th scope="col" className="py-4 px-6 font-semibold">
                      ORDER ID
                    </th>
                    <th scope="col" className="py-4 px-6 font-semibold">
                      DELIVERY ADDRESS
                    </th>
                    <th scope="col" className="py-4 px-6 font-semibold">
                      ORDER DATE
                    </th>
                    <th scope="col" className="py-4 px-6 font-semibold">
                      TOTAL AMOUNT
                    </th>
                    <th scope="col" className="py-4 px-6 font-semibold">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr
                      key={order._id}
                      onClick={() => handleOrderClick(order)}
                      className={`
                        transition-all duration-200 cursor-pointer
                        ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        hover:bg-orange-50 hover:shadow-md hover:scale-[1.01]
                        active:scale-[0.99]
                      `}
                      title="Click to view order details"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        <div className="flex items-center gap-x-2 justify-center">
                          <span className="text-orange-600 font-mono">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-400">
                            👆 Click for details
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-700">
                        <div className="flex items-center justify-center gap-1">
                          <span>📍</span>
                          <span>{order.address}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-700">
                        <div className="flex flex-col items-center">
                          <span>
                            📅 {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(order.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-green-600">
                        <div className="flex items-center justify-center gap-1">
                          <span>💰</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`
                          inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                          ${getStatusColor(order.status)}
                        `}
                        >
                          {order.status === "Delivered" && "✅ "}
                          {order.status === "In Progress" && "🚚 "}
                          {order.status === "Pending" && "⏳ "}
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Info Message */}
            <div className="mt-4 text-center text-sm text-gray-500">
              💡 Click on any order row to view detailed information
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Order ID */}
                <div className="text-center bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Order ID
                  </h3>
                  <p className="text-orange-600 font-mono text-xl">
                    #{selectedOrder._id.slice(-8).toUpperCase()}
                  </p>
                </div>

                {/* Order Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Delivery Address */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                      📍 Delivery Address
                    </h4>
                    <p className="text-gray-700">{selectedOrder.address}</p>
                  </div>

                  {/* Order Date */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                      📅 Order Date
                    </h4>
                    <p className="text-gray-700">
                      {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(selectedOrder.createdAt).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>

                  {/* Total Amount */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                      💰 Total Amount
                    </h4>
                    <p className="text-2xl font-bold text-green-600">
                      ${selectedOrder.total.toFixed(2)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                      📋 Status
                    </h4>
                    <span
                      className={`
                      inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                      ${getStatusColor(selectedOrder.status)}
                    `}
                    >
                      {selectedOrder.status === "Delivered" && "✅ "}
                      {selectedOrder.status === "In Progress" && "🚚 "}
                      {selectedOrder.status === "Pending" && "⏳ "}
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>

                {/* Order Items (Mock Data) */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-4">
                    🍕 Order Items
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white rounded p-3">
                      <div>
                        <p className="font-medium">Margherita Pizza</p>
                        <p className="text-sm text-gray-500">Large size</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$18.50</p>
                        <p className="text-sm text-gray-500">Qty: 1</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-white rounded p-3">
                      <div>
                        <p className="font-medium">Pepperoni Pizza</p>
                        <p className="text-sm text-gray-500">Medium size</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$15.50</p>
                        <p className="text-sm text-gray-500">Qty: 1</p>
                      </div>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center font-semibold">
                      <span>Delivery Fee:</span>
                      <span>$3.50</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Close
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition">
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
