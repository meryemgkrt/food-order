import * as Yup from "yup";

const reservationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  persons: Yup.number()
    .typeError("Must be a number")
    .required("Number of persons is required"),
  date: Yup.date()
    .max(new Date(), "Date cannot be in the future")
    .required("Date is required"),
});

export default reservationSchema;
