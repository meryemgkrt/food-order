import React, { useState, useEffect } from "react";
import Title from "./ui/Title";
import Input from "./form/Input";
import { useFormik } from "formik";
import reservationSchema from "../schema/reservationSchema";

const Reservation = () => {
  const baseInputHeight = 56; // Her input için yükseklik (lg:h-14)
  const inputGap = 12; // Her input arasındaki boşluk
  const smallScreenMapHeight = 250; // Küçük ekran için harita başlangıç yüksekliği
  const [mapHeight, setMapHeight] = useState(424); // Haritanın başlangıç yüksekliği (büyük ekran)

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      persons: "",
      date: "",
    },
    onSubmit,
    validationSchema: reservationSchema,
  });

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768; // sm breakpoint
      const activeErrors = Object.keys(formik.errors).filter(
        (key) => formik.touched[key] && formik.errors[key]
      );
      const additionalHeight = activeErrors.length * 24; // Her hata için eklenen yükseklik
      const baseHeight = isSmallScreen
        ? smallScreenMapHeight
        : baseInputHeight * 5 + inputGap * 4; // 5 input ve 4 aralık
      setMapHeight(baseHeight + additionalHeight);
    };

    handleResize(); // İlk çalıştırma
    window.addEventListener("resize", handleResize); // Resize dinleyicisi
    return () => window.removeEventListener("resize", handleResize); // Temizlik
  }, [formik.errors, formik.touched]);

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Enter your name",
      value: formik.values.fullName,
      errorsMessage: formik.errors.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "text",
      placeholder: "Enter your phone",
      value: formik.values.phoneNumber,
      errorsMessage: formik.errors.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      value: formik.values.email,
      errorsMessage: formik.errors.email,
    },
    {
      id: 4,
      name: "persons",
      type: "number",
      placeholder: "How many persons",
      value: formik.values.persons,
      errorsMessage: formik.errors.persons,
    },
    {
      id: 5,
      name: "date",
      type: "datetime-local",
      placeholder: "Enter your date",
      value: formik.values.date,
      errorsMessage: formik.errors.date,
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <Title className="text-center font-dancing text-4xl font-bold text-primary mb-6">
        Book A Table
      </Title>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
        <form onSubmit={formik.handleSubmit} className="flex-1 w-full">
          <div className="flex flex-col gap-3 w-full">
            {inputs.map((input) => (
              <div key={input.id} className="w-full">
                <Input
                  {...input}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border rounded-lg px-4 peer appearance-none focus:ring-0 outline-none focus:border-primary 
                    ${
                      formik.touched[input.name] && formik.errors[input.name]
                        ? "border-2 border-red-500"
                        : "border-gray-300"
                    } 
                    lg:h-14 sm:h-12`} // Yükseklik büyük ekran için 14, küçük ekran için 12
                />
                {formik.touched[input.name] && formik.errors[input.name] && (
                  <div className="text-red-500 text-xs leading-tight mt-1">
                    {formik.errors[input.name]}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center w-full mt-2">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-1 rounded-full hover:opacity-90 transition"
            >
              Book Now
            </button>
          </div>
        </form>
        <div className="flex-1 w-full mb-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50416.757156092805!2d27.847416550000002!3d37.835778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b92b6627dced2f%3A0xcca12f1bcb3b322e!2zQXlkxLFuLCBFZmVsZXIvQXlkxLFu!5e0!3m2!1str!2str!4v1735823288955!5m2!1str!2str"
            width="100%"
            height={mapHeight} // Dinamik yüksekliği burada uyguluyoruz
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