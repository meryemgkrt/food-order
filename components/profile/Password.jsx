import React, { useState } from "react";
import Title from "../ui/Title";
import { useFormik } from "formik";
import passwordSchema from "@/schema/passwordSchema";
import axios from "axios";
import { toast } from "react-toastify";

const Password = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords don't match!", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);
    try {
      // Debug için log ekleyelim
      console.log("Sending password update for user:", user._id);

      // API'ye doğru formatta şifre bilgisini gönderelim
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        {
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Password update response:", res.data);

      toast.success("Password updated successfully!", {
        position: "top-right",
      });

      actions.resetForm();
    } catch (error) {
      console.error(
        "Password update error:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to update password: ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: passwordSchema,
    enableReinitialize: true,
  });

  const inputs = [
    {
      id: 1,
      type: "password",
      name: "password",
      placeholder: "Enter your new password",
      value: formik.values.password,
      error: formik.touched.password && formik.errors.password,
    },
    {
      id: 2,
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm your new password",
      value: formik.values.confirmPassword,
      error: formik.touched.confirmPassword && formik.errors.confirmPassword,
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
                <span className="text-red-500 text-sm mt-1">{input.error}</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-start mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-all w-full md:w-auto ${
              loading ? "opacity-70" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Password;
