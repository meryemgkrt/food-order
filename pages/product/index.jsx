import Title from "@/components/ui/Title";
import Image from "next/image";
import React from "react";

const Index = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center gap-10 p-5">
      {/* Görsel Alanı */}
      <div className="relative flex-1 w-full md:w-[50%] h-[300px] md:h-[500px]">
        <Image
          src="/image/size.png"
          alt="Pizza Image"
          layout="fill"
          objectFit="contain"
        />
      </div>

      {/* Bilgi Alanı */}
      <div className="flex-1 w-full md:w-[50%] text-center md:text-left">
        <Title className="font-dancing text-4xl md:text-6xl font-bold my-3">
          Gold Pizza
        </Title>
        <span className="text-2xl font-bold text-primary block underline my-4">
          $10
        </span>
        <p className="text-sm md:text-base text-dark leading-relax mb-4">
          Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit,
          magnam voluptatem repellendus sed eaque. Veniam debitis quaerat
          officiis quasi cupiditate quo, quisquam velit, magnam voluptatem
          repellendus sed eaque.
        </p>

        {/* Boyut Seçimi */}
        <div className="">
          <h4 className="text-xl font-bold mb-1">Choose the size</h4>
          <div className="flex items-center md:justify-start justify-center gap-x-12 lg:gap-x-16 md:gap-x-8">
  {/* Small Size */}
  <div className="relative w-10 h-10 md:w-12 md:h-12 hover:scale-110 transition-all cursor-pointer">
    <Image
      src="/image/size.png"
      alt="Small Size"
      layout="fill"
      objectFit="contain"
      className="rounded-full"
    />
    <span className="top-0 font-medium -right-8 absolute bg-primary text-xs px-[5px] rounded-full">
      Small
    </span>
  </div>

  {/* Medium Size */}
  <div className="relative w-14 h-14 md:w-14 md:h-14 hover:scale-110 transition-all cursor-pointer">
    <Image
      src="/image/size.png"
      alt="Medium Size"
      layout="fill"
      objectFit="contain"
      className="rounded-full"
    />
    <span className="top-0 font-medium -right-8 absolute bg-primary text-xs px-[5px] rounded-full">
      Medium
    </span>
  </div>

  {/* Large Size */}
  <div className="relative w-16 h-16 md:w-16 md:h-16 hover:scale-110 transition-all cursor-pointer">
    <Image
      src="/image/size.png"
      alt="Large Size"
      layout="fill"
      objectFit="contain"
      className="rounded-full"
    />
    <span className="top-0 font-medium -right-6 absolute bg-primary text-xs px-[8px] rounded-full">
      Large
    </span>
  </div>
</div>

        </div>
        <div className="flex gap-x-4 my-6 md:justify-start justify-center">
          <label className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="form-checkbox text-primary checked:bg-primary accent-primary"
            />
            <span className="text-sm font-semibold ">Ketçap</span>
           
          </label>
            <label className="flex items-center gap-x-1">
                <input
                type="checkbox"
                className="form-checkbox text-primary checked:bg-primary accent-primary"
                />
                <span className="text-sm font-semibold ">Mayonez</span>
            </label>

            <label className="flex items-center gap-x-1">
                <input
                type="checkbox"
                className="form-checkbox text-primary checked:bg-primary accent-primary"
                />
                <span className="text-sm font-semibold ">Hardal</span>
            </label>
        </div>
        <button className="bg-primary text-white px-9 py-2  rounded-full hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Index;
