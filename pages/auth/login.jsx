import { getSession } from "next-auth/react";
import Title from "@/components/ui/Title";
import { useFormik } from "formik";
import validationSchema from "@/schema/validationSchema";
import LoginInput from "@/components/form/LoginInput";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Session değişikliklerini dinle
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      handleSuccessfulLogin(session.user.email);
    }
  }, [session, status]);

  const handleSuccessfulLogin = async (email) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const users = await response.json();
      const currentUser = users.find((user) => user.email === email);

      if (currentUser?._id) {
        router.push(`/profile/${currentUser._id}`);
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error finding user:", error);
      router.push("/profile");
    }
  };

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

        await handleSuccessfulLogin(email);
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
      icon: FaEnvelope,
    },
    {
      id: 2,
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      value: formik.values.password,
      errorMessage: formik.errors.password,
      touched: formik.touched.password,
      icon: FaLock,
    },
  ];

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-yellow-400 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>
            <p className="text-gray-600 font-medium">
              Checking authentication...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center py-12 px-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-400/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 relative overflow-hidden">
          {/* Top gradient border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-yellow-400 to-primary"></div>

          {/* Header */}
          <div className="text-center mb-8">
            {/* User Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-yellow-400 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaUser className="text-2xl text-white" />
            </div>

            {/* Title */}
            <Title className="font-dancing font-bold text-gray-800 text-4xl mb-2">
              Welcome Back
            </Title>
            <p className="text-gray-600 text-sm">
              Sign in to your account to continue
            </p>

            {/* Decorative line */}
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-yellow-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Input Fields */}
            <div className="space-y-4">
              {inputs.map((input) => (
                <div key={input.id} className="relative group">
                  <div className="relative">
                    {/* Icon */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <input.icon className="text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
                    </div>

                    {/* Enhanced LoginInput */}
                    <LoginInput
                      {...input}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-50/80 border-2 rounded-xl transition-all duration-300 placeholder-gray-400 text-gray-700 focus:outline-none focus:bg-white focus:border-primary focus:shadow-lg focus:shadow-primary/20 ${
                        formik.touched[input.name] && formik.errors[input.name]
                          ? "border-red-400 bg-red-50/50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />

                    {/* Error icon */}
                    {formik.touched[input.name] &&
                      formik.errors[input.name] && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        </div>
                      )}
                  </div>

                  {/* Error Message */}
                  {formik.touched[input.name] && formik.errors[input.name] && (
                    <div className="mt-2 text-red-500 text-sm font-medium flex items-center space-x-1 animate-fadeIn">
                      <span>⚠️</span>
                      <span>{formik.errors[input.name]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform relative overflow-hidden group ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-yellow-400 hover:from-yellow-400 hover:to-primary text-white hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
              }`}
            >
              {/* Button shine effect */}
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}

              <div className="relative z-10 flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <FaUser className="text-sm ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
            </button>

            {/* Register Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link href="/auth/register">
                  <span className="text-primary hover:text-yellow-500 font-semibold cursor-pointer transition-colors duration-300 hover:underline">
                    Create Account
                  </span>
                </Link>
              </p>
            </div>
          </form>

          {/* Decorative Elements */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-yellow-400/20 rounded-full blur-2xl"></div>
          <div className="absolute -top-20 -left-20 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        </div>

        {/* Bottom Info Card */}
        <div className="mt-6 bg-white/60 backdrop-blur-lg rounded-2xl p-4 border border-white/30 text-center">
          <p className="text-gray-600 text-xs">
            🔒 Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session?.user?.email) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const users = res.data;

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
      } else {
        return {
          redirect: {
            destination: `/profile`,
            permanent: false,
          },
        };
      }
    } catch (error) {
      console.error("❌ Error fetching user in GSSP:", error);
      return {
        redirect: {
          destination: `/profile`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}

export default Login;
