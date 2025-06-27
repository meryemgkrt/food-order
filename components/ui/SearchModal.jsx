import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "./Title";
import { IoIosCloseCircle } from "react-icons/io";
import Image from "next/image";
import axios from "axios";
import LoginInput from "../form/LoginInput";
import { useRouter } from "next/router";
import { PacmanLoader } from "react-spinners";

const SearchModal = ({ setIsOpenSearch }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false); // Arama loading state'i
  const router = useRouter();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Arama terimi değiştiğinde loading göster
  useEffect(() => {
    if (searchTerm.length >= 2) {
      setSearchLoading(true);

      // Debounce effect - 1000ms (1 saniye) bekle
      const timeoutId = setTimeout(() => {
        setSearchLoading(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      setSearchLoading(false);
    }
  }, [searchTerm]);

  // Ürünleri filtreleme fonksiyonu
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ürün tıklandığında sayfaya git ve search modalı kapat
  const handleProductClick = (productId) => {
    setIsOpenSearch(false);
    router.push(`/product/${productId}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <OutsideClickHandler onOutsideClick={() => setIsOpenSearch(false)}>
        <div className="bg-white text-black p-6 rounded-xl shadow-lg w-[600px] h-[600px] max-w-md">
          {/* Close Button */}
          <div className="flex justify-end">
            <IoIosCloseCircle
              className="text-primary hover:text-red-600 transition-all cursor-pointer"
              size={26}
              onClick={() => setIsOpenSearch(false)}
            />
          </div>

          {/* Title */}
          <Title className="font-dancing font-bold text-3xl text-center text-warning mb-6">
            Search
          </Title>

          {/* Input */}
          <div className="flex flex-col items-center">
            <LoginInput
              type="text"
              placeholder={searchTerm ? "" : "Type to search..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-primary p-2 rounded mb-6 focus:border-primary focus:ring-primary focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all"
            />

            {/* List */}
            <ul className="w-full mt-4 max-h-[400px] overflow-y-auto">
              {loading ? (
                <div className="text-center p-4">
                  <PacmanLoader color="#f59e0b" size={20} />
                </div>
              ) : searchLoading && searchTerm.length >= 2 ? (
                <div className="text-center flex justify-center items-center text-gray-500 p-4">
                  <PacmanLoader color="#f59e0b" size={20} />
                </div>
              ) : (
                <>
                  {filteredProducts.map((product) => (
                    <li
                      onClick={() => handleProductClick(product?._id)}
                      key={product._id}
                      className="cursor-pointer flex items-center justify-between p-4 border-b hover:bg-primary hover:text-white transition-all"
                    >
                      <div className="flex items-center gap-x-3">
                        <Image
                          src={product.img || "/image/f1.png"}
                          alt={product.title}
                          width={48}
                          height={48}
                          className="rounded"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <span className="font-bold text-[16px]">
                        {product.title}
                      </span>
                      <span className="font-bold text-[16px]">
                        ${product.prices[0]}
                      </span>
                    </li>
                  ))}
                  {filteredProducts.length === 0 &&
                    searchTerm.length >= 2 &&
                    !searchLoading && (
                      <div className="text-center text-gray-500 p-4">
                        "No products found"
                      </div>
                    )}
                </>
              )}
            </ul>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default SearchModal;
