import React from "react";
import Title from "./ui/Title";
import Input from "./form/Input";

const Reservation = () => {
  return (
    <div className="container mx-auto py-12">
      <Title
        className={
          "text-center font-dancing text-4xl font-bold text-primary mb-8"
        }
      >
        Book A Table
      </Title>
      <div className="flex justify-between items-center gap-10">
        <div className="flex-1">
          <div className="flex flex-col gap-3">
            <Input label="Name" type="text" required />
            <Input label="Email" type="text" required />
            <Input label="Password" type="text" required />
            <Input label="Name" type="text" required />
            <Input  type="date" required />
          </div>
          <div className="flex justify-center m-5 ">
            <button className="bg-primary text-white px-4 py-2  rounded-full hover:opacity-90 transition">
              Book Now
            </button>
          </div>
        </div>
        <div className="flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50416.757156092805!2d27.847416550000002!3d37.835778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b92b6627dced2f%3A0xcca12f1bcb3b322e!2zQXlkxLFuLCBFZmVsZXIvQXlkxLFu!5e0!3m2!1str!2str!4v1735823288955!5m2!1str!2str"
            width="100%"
            height="424"
            style={{ border: 0 }}
            className="rounded-lg"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
