import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const MenuItem = ({product}) => {
  return (
    <div className="bg-secondary shadow-md rounded-3xl mt-4 h-full">
      {/* Image Section */}
      <div className="w-full bg-[#e0ecf8] h-[210px] grid place-content-center rounded-bl-[46px] rounded-tl-2xl rounded-tr-2xl">
        <Link href={`/product/${product._id}`}>
          <div className="relative w-36 h-36 hover:scale-110 transition-all">
            <Image
              src={product.img}
              alt={product.title}
              width={144} // Piksel cinsinden genişlik
              height={144} // Piksel cinsinden yükseklik
              className="w-36 h-36 object-cover"
              priority // Hızlı yükleme için
              loading="eager" // Hızlı yükleme için
              
            />
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="bg-secondary text-white p-5 flex flex-col gap-4">
        <h4 className="font-bold text-lg">{product.title} </h4>
        <p className="text-sm leading-relaxed">{product.desc}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">{product.prices[0]}$ </span>
          <button
            className="bg-primary text-white p-3 rounded-full hover:opacity-90 transition-all"
            aria-label="Add to cart"
          >
            <FaShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
