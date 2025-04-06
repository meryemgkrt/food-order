import { getSession } from "next-auth/react";
import Title from "@/components/ui/Title";
import { useFormik } from "formik";
import validationSchema from "@/schema/validationSchema";
import LoginInput from "@/components/form/LoginInput";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [currentUser, setCurrentUser] = useState();

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    let options = { redirect: false, email, password };
    try {
      const res = await signIn("credentials", options);
      actions.resetForm();
      push("/profile")
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });

  const inputs = [
    {
      id: 1,
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      value: formik.values.email,
      errorMessage: formik.errors.email,
      touched: formik.touched.email,
    },
    {
      id: 2,
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      value: formik.values.password,
      errorMessage: formik.errors.password,
      touched: formik.touched.password,
    },
  ];

  const handleClick = () => {
    window.location.href = "https://github.com/login";
  };

  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <Title className="text-center font-dancing font-bold text-primary text-[2.5rem]">
          Login
        </Title>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-y-3 w-full">
            {inputs.map((input) => (
              <LoginInput
                key={input.id}
                {...input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition"
            >
              Login
            </button>

            <button
              onClick={handleClick}
              className="bg-secondary flex justify-center items-center gap-2 text-white px-6 py-3 rounded-full hover:bg-primary-dark transition"
              type="button"
            >
              <FaGithub className="text-lg" />
              <span>Sign in with GitHub</span>
            </button>

            <Link href="/auth/register">
              <span className="block text-center text-secondary hover:underline cursor-pointer">
                Don’t have an account? Register
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return { redirect: { destination: "/profile", permanent: false } };
  }
  return {
    props: {
      session,
    },
  };
}

export default Login;
