import Image from "next/image";
import React, { useState } from "react";
import { BiExit } from "react-icons/bi";
import { RiEBike2Line } from "react-icons/ri";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineHome } from "react-icons/md";
import Title from "@/components/ui/Title";
import Acount from "@/components/profile/Acount";
import Password from "@/components/profile/Password";
import Order from "@/components/profile/Order";

const Index = () => {
  const [tabs, setTabs] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[calc(100vh_-_433px)] gap-6 px-4 md:px-10">
      {/* Profil Kartı */}
      <div className="flex flex-col items-center shadow-lg p-6">
        <div className="flex flex-col items-center">
          <Image
            src="/image/client1.jpg"
            alt="Halime Özcan"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <b className="text-center text-2xl mt-3">Halime Özcan</b>
        </div>

        <ul className="w-full flex flex-col items-center font-bold mt-4">
          <li
            onClick={() => setTabs(0)}
            className={`border-b-2 flex cursor-pointer items-center gap-2 w-full px-8 py-4 hover:bg-primary hover:text-white transition-all ${
              tabs === 0 ? "bg-primary text-white" : "text-black"
            }`}
          >
            <MdOutlineHome />
            <button className="ml-1">Account</button>
          </li>
          <li
            onClick={() => setTabs(1)}
            className={`border-b-2 flex cursor-pointer items-center gap-2 w-full px-8 py-4 hover:bg-primary hover:text-white transition-all ${
              tabs === 1 ? "bg-primary text-white" : "text-black"
            }`}
          >
            <IoKeyOutline />
            <button className="ml-1">Password</button>
          </li>
          <li
            onClick={() => setTabs(2)}
            className={`border-b-2 flex cursor-pointer items-center gap-2 w-full px-8 py-4 hover:bg-primary hover:text-white transition-all ${
              tabs === 2 ? "bg-primary text-white" : "text-black"
            }`}
          >
            <RiEBike2Line />
            <button className="ml-1">Orders</button>
          </li>
          <li
            onClick={() => setTabs(3)}
            className={`border-b-2 flex cursor-pointer items-center gap-2 w-full px-8 py-4 hover:bg-primary hover:text-white transition-all ${
              tabs === 3 ? "bg-primary text-white" : "text-black"
            }`}
          >
            <BiExit />
            <button className="ml-1">Exit</button>
          </li>
        </ul>
      </div>

      {/* Profil Bilgileri */}
      <div className="lg:col-span-2">
        {tabs === 0 && <Acount />}
        {tabs === 1 && (
          <div>
            <Password />
            {/* Password Management Content */}
          </div>
        )}
        {tabs === 2 && (
          <div>
            <Order />
            {/* Orders Content */}
          </div>
        )}
        {tabs === 3 && (
          <div>
            <Title className="text-[32px] md:text-[40px] text-primary font-bold font-dancing">
              Goodbye!
            </Title>
            {/* Exit Content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
