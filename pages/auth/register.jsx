import React from "react";
import { useFormik } from "formik";
import registerSchema from "@/schema/registerSchema";
import LoginInput from "@/components/form/LoginInput";
import Title from "@/components/ui/Title";
import Link from "next/link";
import { useRouter } from "next/router";
const Register = () => {
  const router = useRouter();

  const onSubmit = async (values, actions) => {
    console.log("Submitted Values:", values);
    await new Promise((resolve) => setTimeout(resolve, 600));
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: registerSchema,
  });

  const inputs = [
    {
      id: 1,
      type: "text",
      name: "username",
      placeholder: "Enter your username",
      value: formik.values.username,
      error: formik.touched.username && formik.errors.username,
    },
    {
      id: 2,
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      value: formik.values.email,
      error: formik.touched.email && formik.errors.email,
    },
    {
      id: 3,
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      value: formik.values.password,
      error: formik.touched.password && formik.errors.password,
    },
    {
      id: 4,
      type: "password",
      name: "confirmPassword",
      placeholder: "Enter your password again",
      value: formik.values.confirmPassword,
      error: formik.touched.confirmPassword && formik.errors.confirmPassword,
    },
  ];

  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <Title className="text-center font-dancing font-bold text-primary text-[2.5rem]">
          Register
        </Title>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md mt-4 flex flex-col gap-4"
        >
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

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition"
            >
              Register
            </button>

            <Link
              href="/auth/login"
              className="text-center text-secondary hover:underline"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
