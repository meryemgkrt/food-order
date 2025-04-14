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
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    let options = { redirect: false, email, password };
    setLoading(true);

    try {
      const res = await signIn("credentials", options);

      if (res?.error) {
        toast.error("Invalid email or password!", {
          position: "top-right",
        });
      } else {
        toast.success("Login successful!", {
          position: "top-right",
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`
        );
        const users = await response.json();
        const currentUser = users.find((user) => user.email === email);

        if (currentUser?._id) {
       session && push(`/profile/${currentUser._id}`);
        } else {
          toast.error("User not found in database.");
        }

        actions.resetForm();
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
      });
      console.error(err);
    } finally {
      setLoading(false);
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

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      await signIn("github", { callbackUrl: "/profile" });
    } catch (err) {
      toast.error("GitHub login failed. Please try again.", {
        position: "top-right",
      });
      console.error(err);
      setLoading(false);
    }
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
              disabled={loading}
              className={`bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              onClick={handleGithubLogin}
              disabled={loading}
              className={`bg-secondary flex justify-center items-center gap-2 text-white px-6 py-3 rounded-full hover:bg-primary-dark transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              type="button"
            >
              <FaGithub className="text-lg" />
              <span>Sign in with GitHub</span>
            </button>

            <Link href="/auth/register">
              <span className="block text-center text-secondary hover:underline cursor-pointer">
                Don't have an account? Register
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

  if (session?.user?.email) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

      const users = await res.data; 
      const user = res.data?.find((user) => user.email === session?.user.email);
     console.log("User:", user);
      const currentUser = users.find(
        (user) => user.email === session.user.email
      );

      if (currentUser?._id) {
        return {
          redirect: {
            destination: `/profile/${currentUser._id}`,
            permanent: false,
          },
        };
      }
    } catch (error) {
      console.error("❌ Error fetching user in GSSP:", error);
    }
  }

  return {
    props: {},
  };
}

export default Login;
