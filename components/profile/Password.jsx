import React from "react";
import Title from "../ui/Title";
import LoginInput from "../form/LoginInput";
import { useFormik } from "formik";
import passwordSchema from "@/schema/passwordSchema";

const Password = () => {
  const onSubmit = async (values, actions) => {
    console.log("Submitted Values:", values);
    await new Promise((resolve) => setTimeout(resolve, 600));
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: passwordSchema, // Doğrulama şeması burada kullanılıyor
  });

  const inputs = [
    {
      id: 1,
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      value: formik.values.email,
      error: formik.touched.email && formik.errors.email,
    },
    {
      id: 2,
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      value: formik.values.password,
      error: formik.touched.password && formik.errors.password,
    },
  ];

  return (
    <form className="flex-1" onSubmit={formik.handleSubmit}>
      <div className="p-8">
        <Title className="text-[32px] text-center items-center md:text-[40px] text-primary font-bold font-dancing">
          Password Management
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {inputs.map((input) => (
            <div key={input.id} className="flex flex-col">
              <input
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                value={input.value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`p-3 border-2 rounded-md ${
                  input.error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {input.error && (
                <span className="text-red-500  text-sm mt-1">{input.error}</span>
              )}
            </div>
          ))}
        </div>

        {/* Buton */}
        <div className="flex justify-start mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-all w-full md:w-auto"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Password;
