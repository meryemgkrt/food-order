import * as Yup from "yup";

const registerSchema = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_]{3,16}$/, "Invalid username")
    .required("Username is required"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address")
    .required("Email is required"),
  password: Yup.string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&]).{8,12}$/,
    "Password must be 8-12 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character."
  )
  

    .required("Password is required"),
 confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
 
});

export default registerSchema;
