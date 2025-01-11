import Title from "@/components/ui/Title";
import { useFormik } from "formik";
import validationSchema from "@/schema/validationSchema";
import LoginInput from "@/components/form/LoginInput";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const handleClick = () => {
    window.location.href = "https://github.com/login";
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="container mx-auto py-20">
      {" "}
      {/* Yükseklik artırıldı */}
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        {" "}
        {/* Minimum yüksekliği ayarla */}
        <Title className="text-center font-dancing font-bold text-primary text-[2.5rem]">
          Login
        </Title>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md mt-4 flex flex-col gap-4"
        >
          {/* Email Input */}
          <LoginInput
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />

          {/* Password Input */}
          <LoginInput
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />

          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition" // Butonun boyutunu da artırdık
          >
            Login
          </button>
          <button
            onClick={handleClick}
            className="bg-secondary text-white px-6 py-3 w-full rounded-lg hover:bg-primary-dark transition flex justify-center items-center gap-2"
          >
            <FaGithub className="text-lg" />
            <span>Sign in with GitHub</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
