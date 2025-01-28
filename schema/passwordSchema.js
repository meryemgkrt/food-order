import * as Yup from "yup";

const passwordSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .matches(/^.{6,}$/, "Password must be at least 6 characters long.")
    .required("Password is required"),
});

export default passwordSchema;
