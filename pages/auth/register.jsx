import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import LoginInput from "@/components/form/LoginInput";
import Title from "@/components/ui/Title";
import { registerSchema } from "@/schema/registerSchema";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaCheck,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const Register = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleGoogleSignUp = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/profile",
        prompt: "select_account",
      });
    } catch (error) {
      toast.error("Google sign up failed. Please try again.");
      console.error("Google sign up error:", error);
    }
  };

  const onSubmit = async (values, actions) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        values
      );
      if (res.status === 200) {
        toast.success("Account created successfully! Please login.");
        push("/auth/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
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
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
      icon: FaUser,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
      icon: FaEnvelope,
    },
    {
      id: 3,
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
      icon: FaLock,
      showToggle: true,
      isVisible: showPassword,
      toggleVisibility: () => setShowPassword(!showPassword),
    },
    {
      id: 4,
      name: "confirmPassword",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "Confirm Your Password",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
      icon: FaLock,
      showToggle: true,
      isVisible: showConfirmPassword,
      toggleVisibility: () => setShowConfirmPassword(!showConfirmPassword),
    },
  ];

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

      <div className="relative w-full max-w-lg">
        {/* Main Register Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 relative overflow-hidden">
          {/* Top gradient border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-yellow-400 to-primary"></div>

          {/* Header */}
          <div className="text-center mb-8">
            {/* User Plus Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-yellow-400 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaUserPlus className="text-2xl text-white" />
            </div>

            {/* Title */}
            <Title className="font-dancing font-bold text-gray-800 text-4xl mb-2">
              Join Us Today
            </Title>
            <p className="text-gray-600 text-sm">
              Create your account to get started
            </p>

            {/* Decorative line */}
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-yellow-400 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Fields */}
            <div className="space-y-4">
              {inputs.map((input) => (
                <div key={input.id} className="relative group">
                  <div className="relative">
                    {/* Icon */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <input.icon
                        className={`text-gray-400 group-focus-within:text-primary transition-colors duration-300 ${
                          touched[input.name] && !errors[input.name]
                            ? "text-primary"
                            : ""
                        }`}
                      />
                    </div>

                    {/* Enhanced LoginInput */}
                    <LoginInput
                      {...input}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full pl-12 pr-12 py-4 bg-gray-50/80 border-2 rounded-xl transition-all duration-300 placeholder-gray-400 text-gray-700 focus:outline-none focus:bg-white focus:shadow-lg ${
                        touched[input.name] && errors[input.name]
                          ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:shadow-red-200/50"
                          : touched[input.name] && !errors[input.name]
                          ? "border-primary bg-blue-50/50 focus:border-primary focus:shadow-primary/20"
                          : "border-gray-200 hover:border-gray-300 focus:border-primary focus:shadow-primary/20"
                      }`}
                    />

                    {/* Success/Error icon */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {touched[input.name] && errors[input.name] && (
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      )}
                      {touched[input.name] &&
                        !errors[input.name] &&
                        values[input.name] && (
                          <FaCheck className="text-primary text-sm animate-bounce" />
                        )}
                    </div>
                  </div>

                  {/* Error Message */}
                  {touched[input.name] && errors[input.name] && (
                    <div className="mt-2 text-red-500 text-sm font-medium flex items-center space-x-1 animate-fadeIn">
                      <span>⚠️</span>
                      <span>{errors[input.name]}</span>
                    </div>
                  )}

                  {/* Success Message */}
                  {touched[input.name] &&
                    !errors[input.name] &&
                    values[input.name] && (
                      <div className="mt-2 text-primary text-sm font-medium flex items-center space-x-1 animate-fadeIn">
                        <FaCheck className="text-xs" />
                        <span>Looks good!</span>
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Password Strength Indicator */}
            {values.password && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">
                  Password Strength:
                </p>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        values.password.length >= level * 2
                          ? level <= 2
                            ? "bg-red-400"
                            : level === 3
                            ? "bg-yellow-400"
                            : "bg-primary"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Google Sign Up Button */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full py-4 px-6 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:border-gray-300 hover:bg-gray-50 active:scale-95 flex items-center justify-center space-x-3 group"
            >
              <FcGoogle className="text-2xl group-hover:scale-110 transition-transform duration-300" />
              <span>Sign up with Google</span>
            </button>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform relative overflow-hidden group mt-4 ${
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <FaUserPlus className="text-sm ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link href="/auth/login">
                  <span className="text-primary hover:text-yellow-500 font-semibold cursor-pointer transition-colors duration-300 hover:underline">
                    Sign In Here
                  </span>
                </Link>
              </p>
            </div>
          </form>

          {/* Terms & Conditions */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100">
            <p className="text-xs text-gray-600 text-center">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-yellow-400/20 rounded-full blur-2xl"></div>
          <div className="absolute -top-20 -left-20 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        </div>

        {/* Bottom Info Card */}
        <div className="mt-6 bg-white/60 backdrop-blur-lg rounded-2xl p-4 border border-white/30 text-center">
          <p className="text-gray-600 text-xs flex items-center justify-center space-x-2">
            <span>🛡️</span>
            <span>Secure registration with encrypted data</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
