import Image from "next/image";
import React, { useState } from "react";
import { BiCategory, BiExit } from "react-icons/bi";
import { RiEBike2Line } from "react-icons/ri";
import { MdFastfood } from "react-icons/md";
import Title from "@/components/ui/Title";
import Product from "@/components/admin/Product";
import Orders from "@/components/admin/Orders";
import Categories from "@/components/admin/Categories";
import Footer from "@/components/admin/Footer";
import { FaRegWindowRestore } from "react-icons/fa6";

const profile = () => {
  const [tabs, setTabs] = useState(0);

  const tabList = [
    { id: 0, name: "Product", icon: <MdFastfood />, component: <Product /> },
    { id: 1, name: "Orders", icon: <RiEBike2Line />, component: <Orders /> },
    {
      id: 2,
      name: "Categories",
      icon: <BiCategory />,
      component: <Categories />,
    },
    {
      id: 3,
      name: "Footer",
      icon: <FaRegWindowRestore />,
      component: <Footer />,
    },
    {
      id: 4,
      name: "Exit",
      icon: <BiExit />,
      component: (
        <Title className="text-[32px] md:text-[40px] text-primary font-bold font-dancing">
          Goodbye!
        </Title>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[calc(100vh_-_433px)] gap-6 px-4 md:px-10">
      {/* Sidebar */}
      <div className="flex flex-col items-center shadow-lg p-6">
        <div className="flex flex-col items-center">
          <Image
            src="/image/profile.png"
            alt="Admin"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <b className="text-center text-2xl mt-3">Admin</b>
        </div>

        <ul className="w-full flex flex-col justify-center items-center font-bold mt-4">
          {tabList.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setTabs(tab.id)}
              className={`border-b-2 flex cursor-pointer items-center gap-2 w-full px-8 py-4 hover:bg-primary hover:text-white transition-all ${
                tabs === tab.id ? "bg-primary text-white" : "text-black"
              }`}
            >
              {tab.icon}
              <button className="ml-1">{tab.name}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="lg:col-span-2">{tabList[tabs]?.component}</div>
    </div>
  );
};

export default profile;
