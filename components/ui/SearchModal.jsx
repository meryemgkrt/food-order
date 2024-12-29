import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "./Title";
import { IoIosCloseCircle } from "react-icons/io";
import Image from "next/image";

const SearchModal = ({ setIsOpenSearch }) => {
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
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full border border-gray-300 p-2 rounded mb-6"
            />

            {/* List */}
            <ul className="w-full">
              <li className="flex items-center justify-between p-4 border-b hover:bg-primary hover:text-white transition-all">
                <div className="flex items-center gap-x-3">
                  <Image
                    src="/image/f1.png"
                    alt="Good Pizza"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                 
                </div>
                <span className="font-bold text-[16px]">Good Pizza</span>
                <span className="font-bold text-[16px]">$10</span>
              </li>
              <li className="flex items-center justify-between p-4 border-b hover:bg-primary hover:text-white transition-all">
                <div className="flex items-center gap-x-3">
                  <Image
                    src="/image/f1.png"
                    alt="Good Pizza"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                 
                </div>
                <span className="font-bold text-[16px]">Good Pizza</span>
                <span className="font-bold text-[16px]">$10</span>
              </li>
              <li className="flex items-center justify-between p-4 border-b hover:bg-primary hover:text-white transition-all">
                <div className="flex items-center gap-x-3">
                  <Image
                    src="/image/f1.png"
                    alt="Good Pizza"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                 
                </div>
                <span className="font-bold text-[16px]">Good Pizza</span>
                <span className="font-bold text-[16px]">$10</span>
              </li>
            </ul>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default SearchModal