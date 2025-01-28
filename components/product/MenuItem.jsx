import Image from "next/image";
import Link from "next/link";

import { FaShoppingCart } from "react-icons/fa";

const MenuItem = () => {
 
  return (
    <div className="bg-secondary shadow-md rounded-3xl mt-4 md:h-[calc(100vh-88px)] ">
      {/* Image Section */}
      <div className="w-full  bg-[#e0ecf8] h-[210px] grid place-content-center rounded-bl-[46px]  rounded-tl-2xl rounded-tr-2xl">
        <Link href="/product">
        <div className="relative w-36 h-36 hover:scale-110 transition-all">
          <Image src="/image/size.png" alt="" layout="fill" />
        </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="bg-secondary text-white p-5 flex flex-col gap-4">
        <h4 className="font-bold text-lg ">Delicious Pasta</h4>
        <p className="text-sm leading-relaxed">
          Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit,
          magnam voluptatem repellendus sed eaque.
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">$18</span>
          <button className="bg-primary text-white p-3 rounded-full hover:opacity-90 transition">
            <FaShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
