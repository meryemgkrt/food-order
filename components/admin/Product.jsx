import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const productClear = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );

        if (res.status === 200) {
          toast.success("Product delete");
          getProducts();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
              {products.length > 0 &&
                products.map((product) => (
                  <tr
                    key={product}
                    className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                  >
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-2 justify-center">
                      <Image
                        src={product.img}
                        width={50}
                        height={50}
                        alt={product.title}
                        className="rounded-full object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <span>{product._id.substring(0, 5)} </span>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <span>{product.title} </span>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      ${product.prices}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <button
                        onClick={()=> productClear(product._id)}
                        className="btn-primary hover:bg-red-600 transition-all "
                      >
                        Delete
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

export default Product;
