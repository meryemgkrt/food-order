import Title from "@/components/ui/Title";
import { useFormik } from "formik";
import validationSchema from "@/schema/validationSchema";
import LoginInput from "@/components/form/LoginInput";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Index = () => {
  const onSubmit = async (values, actions) => {
    console.log("Submitted Values:", values);
    await new Promise((resolve) => setTimeout(resolve, 600));
    actions.resetForm();
  };
  const handleClick = () => {
    window.location.href = "https://github.com/login";
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onSubmit, // Burada `onSubmit` eklenmiştir
    validationSchema: validationSchema,
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
    <div className="container mx-auto py-20">
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <Title className="text-center font-dancing font-bold text-primary text-[2.5rem]">
     Order Login
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
              <span className="text-center text-secondary hover:text-clip  cursor-pointer hover:underline">
              Home Page
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
