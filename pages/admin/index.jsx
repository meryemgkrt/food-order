import LoginInput from "@/components/form/LoginInput";
import Title from "@/components/ui/Title";
import userSchema from "@/schema/adminSchema";

import { useFormik } from "formik";
import Link from "next/link";
import React from "react";

import adminSchema from "@/schema/adminSchema";
const index = () => {
  const onSubmit = async (values, actions) => {
    console.log("Submitted Values:", values);
    await new Promise((resolve) => setTimeout(resolve, 600));
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: adminSchema,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });

  const inputs = [
    {
      id: 1,
      type: "text",
      name: "username",
      placeholder: "Enter your userName",
      value: formik.values.userName,
      error: formik.touched.username && formik.errors.username,
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
    <div className="container mx-auto py-1">
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <Title className="text-center font-dancing font-bold text-primary text-[2.5rem]">
          Admin Login
        </Title>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md mt-4 flex flex-col gap-4"
        >
          {/* Inputs */}
          {inputs.map((input) => (
            <LoginInput
              key={input.id}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={input.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={input.error}
            />
          ))}

          {/* Login Button */}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition"
            >
              Login
            </button>

            <Link href="/">
              <span className="text-center justify-center flex items-center text-secondary hover:text-clip  cursor-pointer hover:underline">
                Home Page
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
