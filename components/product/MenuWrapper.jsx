import { useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList }) => {
  console.log(categoryList);
  const [activeMenu, setActiveMenu] = useState("");

  return (
    <div className="container mx-auto mb-16">
      <div className="flex flex-col items-center w-full">
        {/* Title */}
        <Title className="text-center font-dancing text-4xl font-bold text-primary mb-8">
          Our Menu
        </Title>

        {/* Buttons */}
        <div className="flex justify-center gap-3 w-full mt-14 flex-wrap">
          {categoryList &&
            categoryList.map((category) => (
              <button
                key={category._id}
                className={`${
                  activeMenu === category.title
                    ? "bg-yellow-500 text-white"
                    : "bg-secondary text-white"
                } px-4 py-2 rounded-full hover:opacity-90 transition`}
                onClick={() => setActiveMenu(category.title)}
              >
                {category.title}
              </button>
            ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
      <div className="flex justify-center mt-10">
        <button className="bg-primary text-white px-9 py-2 rounded-full hover:opacity-90 transition">
          View More
        </button>
      </div>
    </div>
  );
};

export default MenuWrapper;
