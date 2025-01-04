import React, { useState, useEffect } from "react";
import Title from "./ui/Title";
import Input from "./form/Input";
import { useFormik } from "formik";
import reservationSchema from "../schema/reservationSchema";

const Reservation = () => {
  const initialMapHeight = 424; // Haritanın başlangıç boyutu
  const inputHeight = 23; // Her hata için artış miktarı 20px olarak ayarlandı
  const [mapHeight, setMapHeight] = useState(initialMapHeight);

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
    // Aktif hatalara göre harita yüksekliğini artır
    const activeErrors = Object.keys(formik.errors).filter(
      (key) => formik.touched[key] && formik.errors[key]
    );
    const additionalHeight = activeErrors.length * inputHeight; // Her hata için artış miktarı
    setMapHeight(initialMapHeight + additionalHeight);
  }, [formik.errors, formik.touched]);

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Enter your name",
      value: formik.values.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "text",
      placeholder: "Enter your phone",
      value: formik.values.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      value: formik.values.email,
    },
    {
      id: 4,
      name: "persons",
      type: "number",
      placeholder: "How many persons",
      value: formik.values.persons,
    },
    {
      id: 5,
      name: "date",
      type: "datetime-local",
      placeholder: "Enter your date",
      value: formik.values.date,
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <Title
        className={
          "text-center font-dancing text-4xl font-bold text-primary mb-8"
        }
      >
        Book A Table
      </Title>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10">
        <form onSubmit={formik.handleSubmit} className="flex-1 w-full">
          <div className="flex flex-col gap-3 w-full">
            {inputs.map((input) => (
              <div key={input.id} className="w-full">
                <Input
                  {...input}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-14 w-full border rounded-lg px-4 peer appearance-none focus:ring-0 outline-none focus:border-primary ${
                    formik.touched[input.name] && formik.errors[input.name]
                      ? "border-2 border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched[input.name] && formik.errors[input.name] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors[input.name]}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center w-full mt-12">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-2 rounded-full hover:opacity-90 transition"
            >
              Book Now
            </button>
          </div>
        </form>
        <div className="flex-1 w-full">
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
