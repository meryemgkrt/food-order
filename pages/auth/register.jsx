import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import LoginInput from "@/components/form/LoginInput";
import Title from "@/components/ui/Title";
import { registerSchema } from "@/schema/registerSchema";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Register = () => {
  const { push } = useRouter();

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        values
      );
      if (res.status === 200) {
        toast.success("User created successfully");
        push("/auth/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
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
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Your Password Again",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];

  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <Title className="text-center font-dancing font-bold text-primary text-[2.5rem]">
          Register
        </Title>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-y-3 w-full">
            {inputs.map((input) => (
              <LoginInput
                key={input.id}
                {...input}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 w-full mt-6">
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
