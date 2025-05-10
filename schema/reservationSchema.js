import * as Yup from "yup";

const reservationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full name is required")
    .max(30, " Must be 30 characters or less")
    .min(3, " Must be 3 characters or more"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  persons: Yup.number()
    .typeError("Must be a number")
    .required("Number of persons is required"),
  date: Yup.date()
    
    .required("Date is required"),
});

export default reservationSchema;
