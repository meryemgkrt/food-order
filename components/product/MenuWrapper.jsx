import { useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = () => {
  const [activeMenu, setActiveMenu] = useState("");

  const menus = ["All", "Burger", "Pizza", "Pasta", "Fries"];

  return (
    <div className="container mx-auto  mb-16">
      <div className="flex flex-col items-center w-full">
        {/* Title */}
        <Title className="text-center font-dancing text-4xl font-bold text-primary mb-8">
          Our Menu
        </Title>

        {/* Buttons */}
        <div className="flex justify-center gap-3 w-full mt-14 flex-wrap">
          {menus.map((menu) => (
            <button
              key={menu}
              onClick={() => setActiveMenu(menu)}
              className={`px-6 py-2 rounded-3xl transition-all 
              ${
                activeMenu === menu
                  ? "bg-secondary text-white"
                  : "bg-transparent text-black"
              }`}
            >
              {menu}
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
      <div className="flex justify-center mt-10 ">
        <button className="bg-primary text-white px-9 py-2  rounded-full hover:opacity-90 transition">
            View More
        </button>
      </div>
    </div>
  );
};

export default MenuWrapper;
